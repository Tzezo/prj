'use strict';

app.controller('LoginController',
    function ($scope, $rootScope, $location, authService, notifyService) {
        if(sessionStorage['currentUser'])
        {
            $location.path("/home");
        }

        $scope.login = function(userData) {
            authService.login(userData,
                function success() {
                    notifyService.showInfo("Login successful");
                    $location.path("/home");
                },
                function error(err) {
                    notifyService.showError("Login failed", err);
                }
            );
        };
    }
);
