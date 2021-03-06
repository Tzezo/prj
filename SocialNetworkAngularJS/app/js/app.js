'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap.pagination']);

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net');
//app.constant('pageSize', 2);
app.constant('defaultAvatar', 'img/default_avatar.jpg')

app.config(function ($routeProvider) {

    $routeProvider.when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
    });

    $routeProvider.when('/logout', {
        templateUrl: 'templates/home.html',
        controller: 'LogoutController'
    });

    $routeProvider.when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
    });

    $routeProvider.when('/home', {
        templateUrl: 'templates/home.html',
        controller: 'ProfileController'
    });

    $routeProvider.when('/profile/password', {
        templateUrl: 'templates/user/change-password.html',
        controller: 'ProfileController'
    });

    $routeProvider.when('/profile', {
        templateUrl: 'templates/user/edit-user-profile.html',
        controller: 'ProfileController'
    });

    $routeProvider.when('/users/:username', {
        templateUrl: 'templates/user/wall.html',
        controller: 'UsersController'
    });

    $routeProvider.otherwise(
        { redirectTo: '/' }
    );

});

app.run(function ($rootScope, $location, authService) {
  $rootScope.$on('$locationChangeStart', function (event) {
    if ($location.path().indexOf("/user/") != -1 && !authService.isLoggedIn()) {
      // Authorization check: anonymous site visitors cannot access user routes
      $location.path("/");
    }
  });
});
