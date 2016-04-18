angular.module('issueTracker.addIssueToProject', [
        'issueTracker.services.issues',
        'issueTracker.services.users',
        'issueTracker.services.projects'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:id/add-issue', {
            templateUrl: 'issues/add-issue-to-project/add-issue-to-project.html',
            controller: 'AddIssueToProjectController'
        })
    }])
    .controller('AddIssueToProjectController', [
        '$scope',
        '$location',
        '$routeParams',
        'issues',
        'users',
        'projects',
        'notifyService',
        function($scope, $location, $routeParams, issues, users, projects, notifyService){
            var currentId = $routeParams.id;

            users.getAllUsers()
                .then(function (data) {
                    $scope.users = data;
                });


            projects.getProjectById(currentId)
                .then(function (data) {
                    $scope.project = data;
                });


            $scope.addNewIssue = function (issue) {
                var labels =[],
                    labelsSplit;

                if(issue.Labels){
                    labelsSplit = issue.Labels.split(', ');
                    for (var i = 1; i <= labelsSplit.length; i++) {
                        labels.push({
                            Id: i,
                            Name: labelsSplit[i - 1]
                        });
                    }
                }

                issue.Labels = labels;
                issue.ProjectId = currentId;


                issues.addIssue(issue)
                    .then(function (success) {
                            $location.path('/projects/' + currentId);
                            notifyService.showSuccess('Issue added successfully!');
                        },
                        function (error) {
                            notifyService.showError('Issue add unsuccessful', error);
                        });
            }
        }
    ]);