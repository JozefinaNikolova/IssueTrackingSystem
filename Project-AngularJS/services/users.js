angular.module('issueTracker.services.users', [])
    .factory('users', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {

            function getAllUsers() {
                var deferred = $q.defer();
                $http.get(BASE_URL + 'users/')
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (error) {
                        deferred.reject(error)
                    });

                return deferred.promise;
            }

            return {
                getAllUsers: getAllUsers
            }
        }]);