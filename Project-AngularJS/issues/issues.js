angular.module('issueTracker.issues.issues', [])
    .factory('issues', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {

            function getUserIssues(pageSize, pageNumber, orderBy) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Issues/me?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&orderBy=' + orderBy)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getProjectsIssuesById(id) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Projects/' + id +'/Issues')
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getIssuesByFilter(pageSize, pageNumber, filter, value) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Issues/?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&' + filter + '=' + value)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getIssuesById(id) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Issues/' + id)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function addIssue(data) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'Issues/', data)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function editIssueById(id, data) {
                var deferred = $q.defer();

                $http.put(BASE_URL + 'Issues/' + id, data)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function editIssueStatus(id, statusId, data) {
                var deferred = $q.defer();

                $http.put(BASE_URL + 'Issues/' + id +'/changestatus?statusid=' + statusId, data)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getIssueComments(id) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Issues/' + id + '/comments')
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function addCommentToIssue(id, text) {
                var deferred = $q.defer();

                $http.put(BASE_URL + 'Issues/' + id + '/comments', text)
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