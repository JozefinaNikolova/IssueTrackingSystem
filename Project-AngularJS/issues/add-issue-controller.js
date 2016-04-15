angular.module('issueTracker.addIssue', [
    'issueTracker.services.issues',
    'issueTracker.services.users',
    'issueTracker.services.projects'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-issue', {
            templateUrl: 'issues/Add-new-issue.html',
            controller: 'AddIssueController'
        })
    }])
    .controller('AddIssueController', [
        '$scope',
        '$location',
        'issues',
        'users',
        'projects',
        function($scope, $location, issues, users, projects){
            users.getAllUsers()
                .then(function (data) {
                    $scope.users = data;
                });

            projects.getAllProjects()
                .then(function (data) {
                    $scope.projects = data;
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
                issue.PriorityId = issue.PriorityId || 1;


                issues.addIssue(issue)
                    .then(function (success) {
                        $location.path('/dashboard');
                    });
            }
        }
    ]);