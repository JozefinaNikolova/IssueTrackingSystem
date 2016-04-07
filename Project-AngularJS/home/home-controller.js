angular.module('issueTracker.home', ['issueTracker.users.authentication'])
    .config(['routeProvider', function ($routeProvider) {
        $routeProvider.when('#/', {
            templateUrl: 'home/guestHome.html',
            controller: 'HomeController'
        })
    }])
    .controller('HomeController', [
        '$scope',
        'authentication',
        function($scope, $location, authentication) {
            $scope.loginUser = function (user) {
                authentication.loginUser(user)
                    .then(function(loggedInUser){
                        console.log(loggedInUser);
                    });
            };

            $scope.registerUser = function (user) {
                console.log('in')
                authentication.registerUser(user)
                    .then(function(registeredUser) {
                        console.log(registeredUser);
                    });
            };
        }]);