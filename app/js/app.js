var App = angular.module('App', [
'ngRoute',    
'controllers',
'services'   
    
]);

App.run(function($rootScope, $location,$window, AuthenticationService) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
         if(nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication 
            && !AuthenticationService.isAuthenticated && !$window.sessionStorage.token){
            $location.path("/login");
        }
    });
});

App.config(function($routeProvider, $httpProvider){
    
    $httpProvider.interceptors.push('TokenInterceptor');

    
    $routeProvider
    .when('/', {
        templateUrl: 'login.html',
        controller: 'AdminUserCtrl'
    })
    .when('/menu-top', {
        templateUrl: 'views/menu-top.html',
        controller: 'MenuCtrl',
        access: { requiredAuthentication: true }
    })
    .when('/login', {
        templateUrl: 'login.html',
         controller: 'AdminUserCtrl'
    })    
    
    .when('/message/:id', {
        templateUrl: 'views/messages.html',
        controller: 'MessagesCtrl'    
    })
    
    .when('/create', {
        templateUrl: 'views/create.html',
        controller: 'CreateCtrl',
        access: { requiredAuthentication: true }
    })        
    .when('/edit/:id', {
        templateUrl: 'views/edit.html',
        controller: 'EditCtrl',
        access: { requiredAuthentication: true }
    }) 
    
    .when('/edit_travel/:id', {
        templateUrl: 'views/travel/edit_travel.html',
        controller: 'EditTravelCtrl',
        access: { requiredAuthentication: true}
    })
    
    .when('/signup', {
        templateUrl: 'signup.html',
        controller: 'controllerSignUp',
        access: { requiredAuthentication: false}
    })
    
    
    
    
    .when('/viagens', {
        templateUrl: 'views/read-viagem.html',
        controller: 'ReadCtrlTravel',
        access: { requiredAuthentication: true }
    }) 
    .otherwise({
        redirectTo: '/login'
      });
});

//App.value('API', 'http://localhost:8080');
App.value('API', 'http://web-travelmanager.rhcloud.com');

