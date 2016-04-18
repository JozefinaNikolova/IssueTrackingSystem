angular.module('issueTracker.addProject', ['issueTracker.services.projects', 'issueTracker.services.users'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-project', {
            templateUrl: 'projects/add-project/add-project.html',
            controller: 'AddProjectController'
        })
    }])
    .controller('AddProjectController', [
        '$scope',
        '$location',
        'projects',
        'users',
        'notifyService',
        function($scope, $location, projects, users, notifyService){
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
                        notifyService.showSuccess('Successfully added project!');
                    },
                        function (error) {
                            notifyService.showError('Project add unsuccessful.', error);
                        });
            }
        }
    ]);