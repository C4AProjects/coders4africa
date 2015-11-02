
APP.factory('userSrv',['$http','$rootScope','$window', function ($http,$rootScope,$window) {

    var service={};

    service.getUsersList=function(searchQuery,limit,page,success,error){
            var l=10;
        var p= 1;
        if (page) p=page;
        if (limit) l=limit;


        $http.post($rootScope.config.API_URI+'/user/query?limit='+l+'&page='+p,searchQuery).success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available

            if (data.success){

                success(data);
            }
            else{

                error(data);
            }



        }).error(function(data, status, headers, config) {
            error(data)

        });
    }


    service.getUserById=function(id,success,error){
        $http.get($rootScope.config.API_URI+'/user/'+id).success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available

            if (data.success){

                success(data);
            }
            else{

                error(data);
            }



        }).error(function(data, status, headers, config) {
            error(data)

        });
    }
    service.deleteUserById=function(id,success,error){
        $http.delete($rootScope.config.API_URI+'/user/'+id).success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available

            if (data.success){

                success(data);
            }
            else{

                error(data);
            }



        }).error(function(data, status, headers, config) {

            error(data)

        });
    }

    service.updateUserById=function(id,user,success,error){
        $http.put($rootScope.config.API_URI+'/user/'+id,user).success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available

            if (data.success){

                success(data);
            }
            else{

                error(data);
            }



        }).error(function(data, status, headers, config) {
            error(data)

        });
    }
    service.add=function(user,success,error){
        $http.post($rootScope.config.API_URI+'/user/',user).success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available

            if (data.success){

                success(data);
            }
            else{

                error(data);
            }



        }).error(function(data, status, headers, config) {
            error(data)

        });
    }
    return service;

}]);