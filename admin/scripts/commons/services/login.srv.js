
APP.factory('loginSrv', ['$http', '$rootScope', '$window', function ($http, $rootScope, $window) {


    var service = {};
    var loggedIn = false;


    if ($window.sessionStorage.token) {
        loggedIn = true
    }
    service.login = function (user, success, error) {
        $http.post($rootScope.config.API_URI + '/login', user).success(function (data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            if (data && data.success) {
                $window.sessionStorage.token = data.result.token;


              //  $rootScope.USER = jwtHelper.decodeToken(data.result.token).user;



                loggedIn = true;

                success(data);
            }
            else {

                delete $window.sessionStorage.token;
                loggedIn = false;

                error(data);
            }


        }).error(function (data, status, headers, config) {
            error(data)
            delete $window.sessionStorage.token;


            loggedIn = false;
        });
    }


    service.logout = function (success) {
        delete $window.sessionStorage.token;

        loggedIn = false;


        if (success) success()
    }


    service.setLoggedInStatus = function (logged) {
        loggedIn = logged;


    }
    service.isLoggedIn = function () {
        return loggedIn;
    }

    return service;

}]);