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
        'notifyService',
        function($scope, $location, authentication, notifyService){
            authentication.logout()
                .then(function (success) {
                    authentication.clearCredentials();
                    $location.path('/');
                    notifyService.showSuccess('Successfully logged out!');
                },
                    function (error) {
                        notifyService.showError('Logout unsuccessful.', error);
                    });
        }
    ]);