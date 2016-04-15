angular.module('issueTracker.addProject', ['issueTracker.services.projects', 'issueTracker.services.users'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-project', {
            templateUrl: 'projects/Add-new-project.html',
            controller: 'AddProjectController'
        })
    }])
    .controller('AddProjectController', [
        '$scope',
        '$location',
        'projects',
        'users',
        function($scope, $location, projects, users){
            users.getAllUsers()
                .then(function (data) {
                    $scope.users = data;
                });

            $scope.addNewProject = function (project) {
                var priorities = [],
                    prioritiesSplit,
                    labels =[],
                    labelsSplit;

                if(project.Priorities){
                    prioritiesSplit = project.Priorities.split(', ');
                    for (var i = 1; i <= prioritiesSplit.length; i++) {
                        priorities.push({
                            Id: i,
                            Name: prioritiesSplit[i - 1]
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

                projects.addProject(project)
                    .then(function (success) {
                        $location.path('/dashboard');
                    });
            }
        }
    ]);