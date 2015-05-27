'use strict';

app.controller('RegisterController',
    function ($scope, $rootScope, $location, authService, notifyService) {

        if(sessionStorage['currentUser'])
        {
            $location.path("/home");
        }

        $scope.register = function(userData) {
            authService.register(userData,
                function success(data) {
                    notifyService.showInfo("User registered successfully");
                    $location.path("/home");
                },
                function error(err) {
                    notifyService.showError("User registration failed", err);
                }
            );
        };
    }
);
