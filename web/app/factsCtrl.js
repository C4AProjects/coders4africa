/**
 * Project: coders4africa
 * Created by Haythem Horbit on 12/11/2015.
 */
/**
 * Project: coders4africa
 * Created by Haythem Horbit on 29/10/2015.
 */

APP.controller('factsCtrl', ['$rootScope', '$scope', '$http', 'CONFIG', 'Notification','reCAPTCHA','$translate', function ($rootScope, $scope, $http, CONFIG, Notification,reCAPTCHA,$translate) {

$scope.facts={}
    $scope.getFacts = function () {



        $http.get(CONFIG.API_URI + '/facts').success(function (data, status, headers, config) {
            if (data && data.success) {
                $scope.facts=data.result

            } else if (data && data.error) {

            }


        }).error(function (data, status, headers, config) {
            console.log(data)

        });

    }

    $scope.getFacts()


}])