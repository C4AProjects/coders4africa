


APP.controller('loginCtrl',['$rootScope','$scope', '$state','loginSrv','ngDialog', function ($rootScope,$scope, $state,loginSrv,ngDialog) {

    $scope.user={email:"", password:""};
    if (loginSrv.isLoggedIn()) {


        //  $location.path("/dashboard");
        console.log("logged in, there is session token")
        $state.go("admin.user")


    }





    $scope.signIn=function() {
        loginSrv.login( $scope.user,function(data){
            console.debug("login success")
  /*          console.dir($rootScope.USER)
if($rootScope.USER.role=='superadmin' || $rootScope.USER.role=='reseller'){
    $state.go("app.companiesDashboard")
}else if ($rootScope.USER.role=='admin'){
    $state.go("app.fleetsDashboard",{companyId:$rootScope.USER._company_owner._id})
}else if ($rootScope.USER.role=='user'){
    $state.go("app.fleetsDashboard",{companyId:$rootScope.USER._company_owner._id})

}*/


            $state.go("admin.user")

        },function(data){
            console.error("login failed")

            console.dir(data)

        })
    }



}])