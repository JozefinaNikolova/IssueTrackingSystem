angular.module('issueTracker.dashboard', ['issueTracker.services.issues', 'issueTracker.services.authentication'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardController'
        })
    }])
    .controller('DashboardController', [
        '$scope',
        '$location',
        'issues',
        'authentication',
        function($scope, $location, issues, authentication){
            issues.getUserIssues(20, 1, 'DueDate desc')
                .then(function (userIssues) {
                    console.log(userIssues);
                    $scope.issues = userIssues.Issues;
                });
        }
    ]);