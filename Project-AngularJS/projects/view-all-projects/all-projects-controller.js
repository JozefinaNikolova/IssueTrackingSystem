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
            projects.getAllProjects(300)
                .then(function (data) {
                    $scope.allProjects = data;
                });
        }
    ]);