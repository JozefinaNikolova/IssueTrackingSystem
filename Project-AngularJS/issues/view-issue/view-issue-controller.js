angular.module('issueTracker.viewIssue', ['issueTracker.services.issues'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issues/:id', {
            templateUrl: 'issues/view-issue/view-issue.html',
            controller: 'ViewIssueController'
        })
    }])
    .controller('ViewIssueController', [
        '$scope',
        '$routeParams',
        'issues',
        function($scope, $routeParams, issues){
            var currentId = $routeParams.id;
            issues.getIssuesById(currentId)
                .then(function (data) {
                    var labels = [], priorities = [];

                    for (var i = 0; i < data.Labels.length; i++) {
                        labels.push(data.Labels[i].Name);
                    }

                    data.Labels = labels.join(', ');

                    $scope.issue = data;
                });
        }
    ]);