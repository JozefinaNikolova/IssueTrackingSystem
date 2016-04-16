angular.module('issueTracker.editProject', ['issueTracker.services.projects', 'issueTracker.services.users'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:id/edit', {
            templateUrl: 'projects/Edit-project.html',
            controller: 'EditProjectController'
        })
    }])
    .controller('EditProjectController', [
        '$scope',
        '$routeParams',
        '$location',
        'projects',
        'users',
        function($scope, $routeParams, $location, projects, users){
            users.getAllUsers()
                .then(function (data) {
                    $scope.users = data;
                });

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

                    $scope.project = data;
                });

            $scope.editProject = function (project) {
                var priorities = [],
                    prioritiesSplit,
                    labels =[],
                    labelsSplit;

                if(project.Priorities){
                    prioritiesSplit = project.Priorities.split(', ');
                    for (var i = 0; i < prioritiesSplit.length; i++) {
                        priorities.push({
                            Name: prioritiesSplit[i]
                        });
                    };
                }

                if(project.Labels){
                    labelsSplit = project.Labels.split(', ');
                    for (var i = 1; i <= labelsSplit.length; i++) {
                        labels.push({
                            Id: i,
                            Name: labelsSplit[i - 1]
                        });
                    };
                }

                project.Priorities = priorities;
                project.Labels = labels;

                projects.editProjectById(currentId, project)
                    .then(function (success) {
                        $location.path('/projects/' + currentId);
                    });
            }
        }
    ]);