angular.module('issueTracker.project', ['issueTracker.services.projects'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-project', {
            templateUrl: 'projects/Add-new-project.html',
            controller: 'ProjectController'
        })
    }])
    .controller('ProjectController', [
        '$scope',
        'projects',
        function($scope, projects){
            $scope.addNewProject = function (project) {
                projects.addProject(project);
            }
        }
    ]);