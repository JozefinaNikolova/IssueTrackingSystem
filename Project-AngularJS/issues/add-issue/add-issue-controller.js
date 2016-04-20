angular.module('issueTracker.addIssue', [
    'issueTracker.services.issues',
    'issueTracker.services.users',
    'issueTracker.services.projects'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-issue', {
            templateUrl: 'issues/add-issue/add-issue.html',
            controller: 'AddIssueController'
        })
    }])
    .controller('AddIssueController', [
        '$scope',
        '$location',
        'issues',
        'users',
        'projects',
        'notifyService',
        function($scope, $location, issues, users, projects, notifyService){
            users.getAllUsers()
                .then(function (data) {
                    $scope.users = data;
                });

            projects.getAllProjects()
                .then(function (data) {
                    console.log(data)
                    $scope.projects = data;
                });

            $scope.getPriorities = function () {
                projects.getProjectById($scope.issue.ProjectId)
                    .then(function (data) {
                        $scope.priorities = data.Priorities;
                    })
            };

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

                issues.addIssue(issue)
                    .then(function (success) {
                        $location.path('/dashboard');
                        notifyService.showSuccess('Issue added successfully!');
                    },
                        function (error) {
                            notifyService.show
                        });
            }
        }
    ]);