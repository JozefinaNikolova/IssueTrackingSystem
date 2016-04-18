angular.module('issueTracker.allProjects', ['issueTracker.services.projects'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects', {
            templateUrl: 'projects/view-all-projects/all-projects.html',
            controller: 'AllProjectsController'
        })
    }])
    .controller('AllProjectsController', [
        '$scope',
        'projects',
        function($scope, projects){
            projects.getAllProjects(100, 1, ' ')
                .then(function (data) {
                    console.log(data);
                    $scope.allProjects = data.Projects;
                });
        }
    ]);