angular.module('issueTracker.editIssue', ['issueTracker.services.issues', 'issueTracker.services.users', 'issueTracker.services.projects'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issues/:id/edit', {
            templateUrl: 'issues/edit-issue.html',
            controller: 'EditIssueController'
        })
    }])
    .controller('EditIssueController', [
        '$scope',
        '$routeParams',
        '$location',
        'issues',
        'users',
        'projects',
        function($scope, $routeParams, $location, issues, users, projects){
            var currentId = $routeParams.id;

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

                    $scope.issue = data;

                    projects.getProjectById(data.Project.Id)
                        .then(function (projectData) {
                            console.log(projectData);
                            $scope.priorities = projectData.Priorities;
                        });

                    console.log($scope.issue);
                    console.log($scope.priorities);
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

                issues.editIssueById(currentId, issue)
                    .then(function (success) {
                        $location.path('/issues/' + currentId);
                    });
            }
        }
    ]);