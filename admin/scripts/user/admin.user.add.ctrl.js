
APP.controller('userAddCtrl', ['$scope', '$state', 'userSrv', 'Notification',
    function ($scope, $state, userSrv, Notification) {
        $scope.user = {}
        $scope._ADMIN_USER_ADD = {}


        /*add user*/
        $scope.addUser = function () {
            console.dir($scope.user)
            userSrv.add($scope.user, function (data) {

                if (data.success) {
                    $state.go('admin.user');
                    Notification('User Added');
                    $scope.loadUsers()
                }
            }, function (err) {

            })

        }

        /*add new company*/
        $scope.addNewCompany = function () {
            if ($scope.USER.role == 'superadmin' || $scope.USER.role == 'reseller') {
                ngDialog.open({
                    template: 'scripts/admin/company/admin.company.add.tpl.html',
                    controller: 'companyAddCtrl',
                    scope: $scope

                })
            }
        }

        /*add new fleet*/
        $scope.addNewFleet = function () {
            ngDialog.open({
                template: 'scripts/admin/fleet/admin.fleet.add.tpl.html',
                controller: 'fleetAddCtrl',
                scope: $scope

            })


        }

    }])

