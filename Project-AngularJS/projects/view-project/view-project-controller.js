angular.module('issueTracker.viewProject', [
    'issueTracker.services.issues',
    'issueTracker.services.projects',
    'issueTracker.services.users'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:id', {
            templateUrl: 'projects/view-project/view-project.html',
            controller: 'ViewProjectController'
        })
    }])
    .controller('ViewProjectController', [
        '$scope',
        '$routeParams',
        '$location',
        'issues',
        'projects',
        'users',
        function($scope, $routeParams, $location, issues, projects, users){
            var currentId = $routeParams.id;
            users.getCurrentUser()
                .then(function (data) {
                    $scope.isAdmin = data.data.isAdmin;
                });

            projects.getProjectById(currentId)
                .then(function (data) {
                    var labels = [], priorities = [];

                    for (var i = 0; i < data.Labels.length; i++) {
                        labels.push(data.Labels[i].Name);
                    }

                    for (var i = 0; i < data.Priorities.length; i++) {
                        priorities.push(data.Priorities[i].Name);
                    }

                    data.Labels = labels.join(', ');
                    data.Priorities = priorities.join(', ');

                    data.isLead = function () {
                        return data.Lead.Username == sessionStorage.username;
                    };

                    $scope.project = data;
                });

            var allIssues = function () {
                issues.getProjectsIssuesById(currentId)
                    .then(function (data) {
                        $scope.issues = data;
                    });
            };

            var myIssues = function () {
                issues.getProjectsIssuesById(currentId)
                    .then(function (data) {
                        $scope.issues = data.filter(function (issue) {
                            return issue.Assignee.Username == sessionStorage.username;
                        });
                    });
            };

            myIssues();

            $scope.changeFilter = function(filter){
                if(filter == 'MyIssues'){
                    myIssues();
                }
                else if(filter == 'AllIssues'){
                    allIssues();
                }
            }
        }
    ]);