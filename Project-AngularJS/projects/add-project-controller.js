angular.module('issueTracker.addProject', ['issueTracker.services.projects'])
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
        function($scope, $location, projects){
            $scope.addNewProject = function (project) {
                var priorities = [],
                    prioritiesSplit = project.Priorities.split(', '),
                    labels =[],
                    labelsSplit = project.Labels.split(', ');

                for (var i = 1; i <= prioritiesSplit.length; i++) {
                    priorities.push({
                        Id: i,
                        Name: prioritiesSplit[i]
                    });
                };

                for (var i = 1; i <= labelsSplit.length; i++) {
                    labels.push({
                        Id: i,
                        Name: labelsSplit[i]
                    });
                };

                project.Priorities = priorities;
                project.Labels = labels;

                projects.addProject(project)
                    .then(function (success) {
                        $location.path('/dashboard');
                    });
            }
        }
    ]);