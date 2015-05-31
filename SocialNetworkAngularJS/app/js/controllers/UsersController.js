'use strict';

// The AppController holds the presentation logic for the entire app (common all screens)
app.controller('UsersController',
    function ($scope, $location, $routeParams, defaultAvatar, authService, notifyService, userService) {

        $scope.username = $routeParams.username;
        $scope.defaultAvatar = defaultAvatar;
        userService.GetUserByUsername($scope.username,
            function(serverData) {
                $scope.userData = serverData;
                console.log(serverData)
            },
            function(serverError) {
                $scope.userData = [];
            });

});
