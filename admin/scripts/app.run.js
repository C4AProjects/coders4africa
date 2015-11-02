
APP.run(['$rootScope', '$state', 'CONFIG', '$window', '$location', 'loginSrv','Notification', function ($rootScope, $state, CONFIG, $window, $location, loginSrv,Notification) {
    ///

    $rootScope.config = CONFIG;
    $rootScope.$on('$stateChangeStart', function (event, next) {
        $rootScope.hideNavBar = next.hideNavBar;
        // console.log(next.templateUrl +"    "+next.hideNavBar)
        if (next.userRole && _.indexOf(next.userRole, $rootScope.USER.role) == -1) {


            //event.preventDefault()
        }

    });




    $rootScope.$on('responseError', function (event, response) {

        if (response.status == 400 || response.status == 401 || response.status == 403) {
            var message = "Unauthorized"
            if (response.data.errors.message) message = response.data.errors.message

          //  Notification.error({title: 'ACCESS ERROR ' + response.status, message: message});
            loginSrv.logout(function (data) {
                console.debug("logout success")

                $state.go("login")
            })
        } else if (response.status == 500) {
            Notification.error({title: 'INTERNAL SERVER ERROR', message: response});
        }
        else {
            if (response.data && response.data.error)

                Notification.error({title: ' ERROR ' + response.status, message: response.data.error});
        }


    });


    if (loginSrv.isLoggedIn()) {


      //  $location.path("/dashboard");
        console.log("logged in, there is session token")
        $state.go("admin.user")


    }

}])

