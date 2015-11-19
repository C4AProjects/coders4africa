/**
 * Project: coders4africa
 * Created by Haythem Horbit on 13/11/2015.
 */
/**
 * Project: coders4africa
 * Created by Haythem Horbit on 12/11/2015.
 */
/**
 * Project: coders4africa
 * Created by Haythem Horbit on 29/10/2015.
 */

APP.controller('mailCtrl', ['$rootScope', '$scope', '$http', 'CONFIG', 'Notification','reCAPTCHA', '$translate',function ($rootScope, $scope, $http, CONFIG, Notification,reCAPTCHA,$translate) {

    $scope.msg={}

    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    $scope.sendMsg = function () {

        if (!$scope.msg.name) {
            Notification.error("Please Type your Name ");
            return;
        }
        if (!$scope.msg.msg) {
            Notification.error("Please Type your msg");
            return;
        }
        if (!$scope.msg.email || !validateEmail($scope.msg.email)) {
            Notification.error("Please validate your Email ");
            return;
        }

      $http.post(CONFIG.API_URI + '/msg',$scope.msg).success(function (data, status, headers, config) {
            if (data && data.success) {
                Notification('Your message was sent');

            } else if (data && data.error) {
                Notification.error(data.error);
            }


        }).error(function (data, status, headers, config) {
            console.log(data)

        });

    }




}])