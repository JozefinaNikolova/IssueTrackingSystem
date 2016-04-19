angular.module('issueTracker.dashboard', ['issueTracker.services.issues', 'issueTracker.services.authentication'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'home/dashboard/dashboard.html',
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
                        userIssues.TotalCount = userIssues.Issues.length;
                        $scope.issues = userIssues.Issues;
                        console.log(userIssues);
                    }
                );

                $scope.issueParams = {
                    'startPage': 1,
                    'pageSize': 2
                };

                $scope.reloadIssues = function(){
                    issues.getUserIssues(
                        $scope.issueParams.pageSize,
                        $scope.issueParams.pageSize,
                        'DueDate desc')
                        .then(function success(data) {
                            // TODO: put the issues in the scope
                            console.log(data);
                        },
                    function error(error){
                        // TODO: display an error message
                    })
                };
            //$scope.reloadIssues();
        }
    ]);