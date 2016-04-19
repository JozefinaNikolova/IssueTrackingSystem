angular.module('issueTracker.viewProject', ['issueTracker.services.issues', 'issueTracker.services.projects'])
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
        function($scope, $routeParams, $location, issues, projects){
            var currentId = $routeParams.id;
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
                    console.log(data);
                });

            issues.getProjectsIssuesById(currentId)
                .then(function (data) {
                    $scope.issues = data;
                    console.log(data);
                });
        }
    ]);