
APP.controller('userEditCtrl', ['$scope', '$state', 'userSrv', '$stateParams',  'Notification',
    function ($scope, $state, userSrv, $stateParams, Notification) {
        $scope._ADMIN_EDIT_ADD = {}

        /*get user by id*/

        userSrv.getUserById($stateParams.userId, function (data) {
            $scope.user = data.result;
            $scope.getCompanyFleets(  $scope.user._company_owner)
        }, function (error) {
            if (error) {
                console.log(error);
                $state.go("admin.user")
            }
        })



        /*update user*/
        $scope.UpdateUser = function () {

            if ($scope._ADMIN_EDIT_ADD.password && $scope._ADMIN_EDIT_ADD.password != $scope._ADMIN_EDIT_ADD.confirm_password) {
                ngDialog.openConfirm({
                    template: 'scripts/commons/dialog/error.dlg.html',
                    overlay: false,
                    showClose: false,
                    controller: ['$scope', function ($scope) {
                        // controller logic
                        $scope.title = "Update User"
                        $scope.message = "Verify your Password"
                    }]
                });
                return;
            }


            if ($scope._ADMIN_EDIT_ADD.password) {
                $scope.user.password = $scope._ADMIN_EDIT_ADD.password
            }
            userSrv.updateUserById($stateParams.userId, $scope.user, function (data) {
                if (data.success) {
                    $state.go("admin.user")
                    Notification('User Updated');
                    $scope.loadUsers()
                }

            }, function (error) {
                if (error) {
                    console.log(error);
                    $state.go("admin.user")
                }
            })
        }

        /*add new Fleet*/
        $scope.addNewFleet = function () {
            ngDialog.open({
                template: 'scripts/admin/fleet/admin.fleet.add.tpl.html',
                controller: 'fleetAddCtrl',
                scope: $scope


            })
        }
        /*add new Company*/
        $scope.addNewCompany = function () {
            ngDialog.open({
                template: 'scripts/admin/company/admin.company.add.tpl.html',
                controller: 'companyAddCtrl',
                scope: $scope


            })
        }
    }])