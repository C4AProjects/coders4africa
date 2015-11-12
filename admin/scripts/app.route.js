

APP.config(['$stateProvider', '$urlRouterProvider','$locationProvider',function ($stateProvider, $urlRouterProvider,$locationProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/login");
    //
    // Now set up the states
    $stateProvider
     .state('login', {
            url: '/login',
            templateUrl: './scripts/login/login.tpl.html',
            controller: "loginCtrl",
            hideNavBar:true,
            isPublicAccess:true
        })
        .state('admin', {
            url: '/admin',
            templateUrl: './scripts/app/app.tpl.html',
            abstract: true
            //templateUrl: './scripts/admin/user/admin.user.tpl.html',


        })

   .state('admin.user', {
            url: '/user',
            templateUrl: './scripts/user/admin.user.tpl.html',
            //templateUrl: './scripts/admin/user/admin.user.tpl.html',
            controller: "userCtrl"


        }).state('admin.user.add', {
            url: '/add',
            templateUrl: './scripts/user/admin.user.add.tpl.html',
           controller: "userAddCtrl"

        }).state('admin.user.edit', {
            url: '/edit/:userId',
            templateUrl: './scripts/user/admin.user.edit.tpl.html',
            controller: "userEditCtrl"


        }).state('facts', {
            url: '/facts',
            templateUrl: './scripts/facts/facts.html',
            controller: "factsCtrl"


        })






}]);

