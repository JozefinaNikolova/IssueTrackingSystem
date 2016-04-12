angular.module('issueTracker.addProject', ['issueTracker.services.projects'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-project', {
            templateUrl: 'projects/Add-new-project.html',
            controller: 'AddProjectController'
        })
    }])
    .controller('AddProjectController', [
        '$scope',
        'projects',
        function($scope, projects){
            $scope.addNewProject = function (project) {
                projects.addProject(project);
            }
        }
    ]);