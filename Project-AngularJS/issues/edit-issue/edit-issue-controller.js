angular.module('issueTracker.editIssue', ['issueTracker.services.issues', 'issueTracker.services.users', 'issueTracker.services.projects'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issues/:id/edit', {
            templateUrl: 'issues/edit-issue/edit-issue.html',
            controller: 'EditIssueController'
        })
    }])
    .controller('EditIssueController', [
        '$scope',
        '$routeParams',
        '$route',
        '$location',
        'issues',
        'users',
        'projects',
        'notifyService',
        function($scope, $routeParams, $route, $location, issues, users, projects, notifyService){
            var currentId = $routeParams.id;

            users.getCurrentUser()
                .then(function (data) {
                    $scope.isAdmin = data.data.isAdmin;
                });

            users.getAllUsers()
                .then(function (data) {
                    $scope.users = data;
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
                        .then(function (projectData) {
                            $scope.isLead = function () {
                                if(projectData.Lead.Username == sessionStorage.username){
                                    return true;
                                }
                                return false;
                            };

                            $scope.priorities = projectData.Priorities;
                        });

                    console.log($scope.issue);
                });

            $scope.editIssue = function (issue) {
                var labels =[],
                    labelsSplit;

                if(issue.Labels){
                    labelsSplit = issue.Labels.split(', ');
                    for (var i = 0; i < labelsSplit.length; i++) {
                        labels.push({
                            Name: labelsSplit[i]
                        });
                    };
                }

                issue.Labels = labels;

                var editedIssue = {
                    Title: issue.Title,
                    AssigneeId: issue.Assignee.Id,
                    PriorityId: issue.Priority.Id,
                    DueDate: issue.DueDate,
                    Labels: labels,
                    Description: issue.Description
                };

                issues.editIssueById(currentId, editedIssue)
                    .then(function (success) {
                        $location.path('/issues/' + currentId);
                        notifyService.showSuccess('Issue edited successfully!');
                    },
                        function (error) {
                            notifyService.showError('Unsuccessful issue edit.', error);
                        });
            };

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
        }
    ]);