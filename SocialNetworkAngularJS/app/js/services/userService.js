'use strict';

app.factory('userService', function($http, baseServiceUrl, authService) {
    var service = {};

    var userServiceUrl = baseServiceUrl + '/api/me';

    service.ChangePassword = function(changePasswordData, success, error) {
        $http.put(userServiceUrl + '/ChangePassword', changePasswordData, {
                headers: authService.getAuthHeaders()
            })
            .success(function(data, status, headers, config) {
                success(data);
            }).error(error);
    };

    service.EditUserProfile = function(editUserData, success, error) {
        $http.put(userServiceUrl, editUserData, {
               headers: authService.getAuthHeaders()
           })
           .success(function(data, status, headers, config) {
               sessionStorage['currentUserData'] = JSON.stringify(config.data);
               success(data);
           }).error(error);
    };

    service.GetCurrentUserData = function(success, error) {
        $http.get(userServiceUrl, {
                headers: authService.getAuthHeaders()
            })
            .success(function(data, status, headers, config) {
                success(data);
            }).error(error);
    };

    service.SearchUsersByName = function(name, success, error) {
        $http.get(baseServiceUrl + '/api/users/search?searchTerm=' + name, {
                headers: authService.getAuthHeaders()
            })
            .success(function(data, status, headers, config) {
                success(data);
            }).error(error);
    };

    return service;
});
