
APP.controller('headerCtrl',['$rootScope','$scope', '$state','loginSrv', function ($rootScope,$scope, $state,loginSrv) {

    $scope.logout=function() {
        console.log("looooo")
        loginSrv.logout( function(data){
            console.debug("logout success")

            $state.go("login")
        })
    }



}])