var App = angular.module('services', []);

App.factory('Lembretes', function($http, API){
	var lembretes = [{titulo: 'Ola'},{titulo: 'Ola Hello'}];
	return {
		read: function(){
			return $http.get(API+'lembretes');
		},
		create: function(item){
			return $http.post(API+'lembretes', item);
		},
		profile: function(id){
			return $http.get(API+'lembrete/'+id);	
		},
		update: function(item, id){
			return $http.put(API+'lembrete/'+id, item);	
		},
		delete: function(id){
			return $http.delete(API+'lembrete/'+id);
		}
	}
});

App.factory('Login', function($http, API){	
	return {
		read: function(){
			return $http.get(API+'/auth/facebook');
		}		
	}
});


App.factory('Viagem', function($http, API){	
	return {
		read: function(){
			return $http.get(API+'/viagens');
		},
        update: function(item, id){
			return $http.put(API+'/viagem/'+id, item);	
	   },
        profile: function(id){
			return $http.get(API+'/viagem/'+id);	
		},
        delete: function(id){
			return $http.delete(API+'/viagem/'+id);
		}
}});

App.factory('Messages', function($http, API){	
	return {
		readMessage: function(id){
			return $http.get(API+'/message/'+id);
		}		
	}
});

App.factory('AuthenticationService', function() {
    var auth = {
        isLogged: false,
        isAuthenticated: false
    }
 
    return auth;
});


App.factory('UserService', function($http, API) {
    return {
        logIn: function(username, password) {
            return $http.post(API + '/authenticate', {user: username, pass: password});
        },
 
        logOut: function() {
 
        }
    }
});


App.factory('TokenInterceptor', function ($q, $window, $location, AuthenticationService) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization =$window.sessionStorage.token;                
            }
            return config;
        },
 
        requestError: function(rejection) {
            return $q.reject(rejection);
        },
 
        /* Set Authentication.isAuthenticated to true if 200 received */
        response: function (response) {
            if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthenticationService.isAuthenticated) {
                AuthenticationService.isAuthenticated = true;
                AuthenticationService.isLogged = true;
            }
            return response || $q.when(response);
        },
 
        /* Revoke client authentication if 401 is received */
        responseError: function(rejection) {
            if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticationService.isAuthenticated)) {
                delete $window.sessionStorage.token;
                AuthenticationService.isAuthenticated = false;
                
                $location.path("/message/1");
            }
 
            return $q.reject(rejection);
        }
    };
});
