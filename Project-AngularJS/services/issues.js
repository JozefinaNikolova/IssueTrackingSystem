angular.module('issueTracker.services.issues', [])
    .factory('issues', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {

            function getUserIssues(pageSize, pageNumber, orderBy) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'issues/me?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&orderBy=' + orderBy)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getProjectsIssuesById(id) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'projects/' + id +'/issues')
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getIssuesByFilter(pageSize, pageNumber, filter, value) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'issues/?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&' + filter + '=' + value)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getIssuesById(id) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'issues/' + id)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function addIssue(data) {
                var deferred = $q.defer();
                $http.post(BASE_URL + 'issues/', data)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function editIssueById(id, data) {
                var deferred = $q.defer();

                $http.put(BASE_URL + 'issues/' + id, data)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function editIssueStatus(id, statusId) {
                var deferred = $q.defer();

                $http.put(BASE_URL + 'issues/' + id +'/changestatus?statusid=' + statusId, null)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getIssueComments(id) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'issues/' + id + '/comments')
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function addCommentToIssue(id, text) {
                var deferred = $q.defer();

                $http.put(BASE_URL + 'issues/' + id + '/comments', text)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                getUserIssues: getUserIssues,
                getProjectsIssuesById: getProjectsIssuesById,
                getIssuesByFilter: getIssuesByFilter,
                getIssuesById: getIssuesById,
                addIssue: addIssue,
                editIssueById: editIssueById,
                editIssueStatus: editIssueStatus,
                getIssueComments: getIssueComments,
                addCommentToIssue: addCommentToIssue
            }
        }]);