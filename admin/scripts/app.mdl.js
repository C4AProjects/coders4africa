
APP =angular.module("c4a",
    [
        'ui.router',
        'ngGrid', // angular grid
        'ui', // angular ui


'ngAnimate',
        'ui.bootstrap',// jquery ui bootstrap

        'angularSpinner',
        'ui.select2',
        'ngDialog',
        'ui-notification',
        'angular-jwt'


    ]);




APP.factory('ajax-loader', function ($rootScope, $q, $window,usSpinnerService) {
        var requests = 0;

        function show() {
            if (!requests) {
                $rootScope.$broadcast("ajax-start");
                usSpinnerService.spin('spinner-1');
            }
            requests++;
        }

        function hide() {
            requests--;
            if (!requests) {
                $rootScope.$broadcast("ajax-stop");
                usSpinnerService.stop('spinner-1');
            }
        }

        return {
            'request': function (config) {
               // console.log(config)
                if(config.url.indexOf("NOLOAD") == -1)
                show();
                return $q.when(config);
            }, 'response': function (response) {
                hide();
                return $q.when(response);
            }, 'responseError': function (rejection) {
                hide();
                return $q.reject(rejection);
            }
        };
    }
)
APP.factory('authInterceptor', function ($rootScope, $q, $window) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                return config;
            },
            response: function (response) {
               // console.dir(response)


                $rootScope.$broadcast("responseError", response);


                return response || $q.when(response);
            },
            responseError:function(response){

                $rootScope.$broadcast("responseError", response);
              return response;
           }
        }
    }
).config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');

         $httpProvider.interceptors.push('ajax-loader');
    })




