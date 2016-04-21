angular.module('issueTracker.viewIssue', [
    'issueTracker.services.issues',
    'issueTracker.services.projects',
    'issueTracker.services.users'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issues/:id', {
            templateUrl: 'issues/view-issue/view-issue.html',
            controller: 'ViewIssueController'
        })
    }])
    .controller('ViewIssueController', [
        '$scope',
        '$routeParams',
        '$route',
        'issues',
        'projects',
        'users',
        'notifyService',
        function($scope, $routeParams, $route, issues, projects, users, notifyService){
            var currentId = $routeParams.id;

            users.getCurrentUser()
                .then(function (data) {
                    $scope.isAdmin = data.data.isAdmin;
                });

            issues.getIssuesById(currentId)
                .then(function (data) {
                    var labels = [], priorities = [];

                    for (var i = 0; i < data.Labels.length; i++) {
                        labels.push(data.Labels[i].Name);
                    }

                    data.Labels = labels.join(', ');

                    data.isAssignee = function () {
                        return data.Assignee.Username == sessionStorage.username;
                    };

                    $scope.issue = data;

                    projects.getProjectById(data.Project.Id)
                        .then(function (project) {
                            $scope.isLead = function () {
                                if(project.Lead.Username == sessionStorage.username){
                                    return true;
                                }
                                return false;
                            }
                        });

                    issues.getProjectsIssuesById(data.Project.Id)
                        .then(function (projectIssues) {
                            $scope.isAssociated = function () {
                                for (var i = 0; i < projectIssues.length; i++) {
                                    var prIssue = projectIssues[i];
                                    if(prIssue.Assignee.Username == sessionStorage.username){
                                        return true;
                                    }
                                }
                                return false;
                            };
                        })
                });


            issues.getIssueComments(currentId)
                .then(function (data) {
                    $scope.comments = data;
                    console.log(data);
                });

            $scope.changeStatus = function (id) {
                issues.editIssueStatus(currentId, id)
                    .then(function (success) {
                        $route.reload();
                        notifyService.showSuccess('Status changed successfully!');
                    },
                        function (error) {
                            notifyService.showError('Unable to change status.', data);
                        })
            };

            $scope.addComment = function(comment){
                issues.addCommentToIssue(currentId, comment)
                    .then(function (success) {
                        $route.reload();
                        notifyService.showSuccess('Comment added successfully!');
                    },
                        function (error) {
                            notifyService.showError('Unable to add comment', error);
                        })
            }
        }
    ]);