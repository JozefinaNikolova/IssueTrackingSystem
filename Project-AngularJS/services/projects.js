angular.module('issueTracker.services.projects', [])
    .factory('projects', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {

            function getAllProjects(){
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Projects/')
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getProjectById(id){
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Projects/' + id)
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
                    data)
                    .then(function(response) {
                        console.log(response.date);
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function editProjectById(id, data){
                var deferred = $q.defer();

                $http.put(BASE_URL + 'Projects/' + id,
                    data)
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