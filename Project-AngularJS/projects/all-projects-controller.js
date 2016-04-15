angular.module('issueTracker.allProjects', ['issueTracker.services.projects'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects', {
            templateUrl: 'projects/all-projects.html',
            controller: 'AllProjectsController'
        })
    }])
    .controller('AllProjectsController', [
        '$scope',
        'projects',
        function($scope, projects){
            projects.getAllProjects()
                .then(function (data) {
                    console.log(data);
                    $scope.allProjects = data;
                });
        }
    ]);