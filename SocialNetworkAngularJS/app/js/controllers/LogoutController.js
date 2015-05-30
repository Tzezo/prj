'use strict';

// The AppController holds the presentation logic for the entire app (common all screens)
app.controller('LogoutController',
    function ($scope, $location, authService, notifyService) {
		// Put the authService in the $scope to make it accessible from all screens
        //$scope.authService = authService;
        authService.logout();
        notifyService.showInfo("Logout successful");
        $location.path('/');
    }
);
