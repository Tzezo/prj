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

    return service;
});
