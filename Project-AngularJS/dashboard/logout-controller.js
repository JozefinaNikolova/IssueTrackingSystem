angular.module('issueTracker.logout', ['issueTracker.services.authentication'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/logout', {
            template: ' ',
            controller: 'LogoutController'
        })
    }])
    .controller('LogoutController', [
        '$scope',
        '$location',
        'authentication',
        function($scope, $location, authentication){
            authentication.logout()
                .then(function (success) {
                    authentication.clearCredentials();
                    $location.path('/');
                });
        }
    ]);