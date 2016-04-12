angular.module('issueTracker.services.projects', [])
    .factory('projects', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {

            var authHeader = {headers: {Authorization: 'Bearer ' + sessionStorage.authToken}};

            function getAllProjects(){
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Projects/',
                    authHeader)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getProjectById(id){
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Projects/' + id,
                    authHeader)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function addProject(data){
                var deferred = $q.defer();

                $http.post(BASE_URL + 'Projects/',
                    data,
                    authHeader)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function editProjectById(id, data){
                var deferred = $q.defer();

                $http.put(BASE_URL + 'Projects/' + id,
                    data,
                    authHeader)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                getAllProjects: getAllProjects,
                getProjectById: getProjectById,
                addProject: addProject,
                editProjectById: editProjectById
            }
        }]);