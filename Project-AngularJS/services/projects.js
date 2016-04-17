angular.module('issueTracker.services.projects', [])
    .factory('projects', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {

            function getAllProjects(pageSize, pageNumber, filter){
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Projects/?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&filter=' + filter)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getProjectById(id){
                var deferred = $q.defer();

                $http.get(BASE_URL + 'projects/' + id)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function addProject(data){
                var deferred = $q.defer();

                $http.post(BASE_URL + 'projects/',
                    data)
                    .then(function(response) {
                        console.log(response.data);
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function editProjectById(id, data){
                var deferred = $q.defer();

                $http.put(BASE_URL + 'projects/' + id,
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