/**
 * Project: coders4africa
 * Created by Haythem Horbit on 19/11/2015.
 */
/**
 * Project: coders4africa
 * Created by Haythem Horbit on 12/11/2015.
 */
/**
 * Project: coders4africa
 * Created by Haythem Horbit on 29/10/2015.
 */

APP.controller('appCtrl', ['$rootScope', '$scope', '$http', 'CONFIG', 'Notification','reCAPTCHA','$translate', function ($rootScope, $scope, $http, CONFIG, Notification,reCAPTCHA,$translate) {
$scope.key='en'

    $scope.setLang = function(langKey) {
        // You can change the language during runtime
        $translate.use(langKey);
        $scope.key=langKey
    };
    $scope.setLang($scope.key)
}])