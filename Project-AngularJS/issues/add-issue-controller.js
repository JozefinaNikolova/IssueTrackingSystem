angular.module('issueTracker.addIssue', ['issueTracker.services.issues'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-issue', {
            templateUrl: 'issues/Add-new-issue.html',
            controller: 'AddIssueController'
        })
    }])
    .controller('AddIssueController', [
        '$scope',
        '$location',
        'issues',
        function($scope, $location, issues){
            $scope.addNewIssue = function (issue) {
                var labels =[],
                    labelsSplit;

                if(issue.Labels){
                    labelsSplit = issue.Labels.split(', ');
                    for (var i = 1; i <= labelsSplit.length; i++) {
                        labels.push({
                            Id: i,
                            Name: labelsSplit[i - 1]
                        });
                    }
                }

                issue.Labels = labels;
                issue.PriorityId = issue.PriorityId || 1;


                issues.addIssue(issue)
                    .then(function (success) {
                        $location.path('/dashboard');
                    });
            }
        }
    ]);