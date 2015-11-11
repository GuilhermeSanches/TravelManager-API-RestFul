var App = angular.module('controllers', []);
  

App.controller('MenuCtrl', function($scope, $route){
    
});

App.controller('MessagesCtrl', function($scope, Messages, $route, $location, $routeParams){
    $('#myModal').modal('show');
    var mensagem = $routeParams.id; 
    console.log(mensagem);
    Messages.readMessage(mensagem).then(function(data){
         console.log("entrou aqui com a mensagem: "+data.data.description);
		$scope.message = data.data.description;        	
    });
    
    
    
   $('#myModal').on('hide.bs.modal', function(){       
      $(window.document.location).attr('href',"/");          
})
    
});

App.controller('ReadCtrl', function($scope, Lembretes, $route){
	$scope.lembretes = [];
    
      $( "#img" ).show("slow");
      $( "#maps" ).show("slow");
      $( "#openMap").slideUp();
      $( "#tops" ).show("slow");
    
    $("#tops").click(function() { 
       $("#img").slideUp();
       $("#maps").slideUp();
       $( "#openMap").show("slow");
        });
    
                            
    $("#img2").click(function(){ 
      $("#img").show( "slow" );
      $("#maps").show( "slow" );
      $("#openMap").slideUp();  
});
    
    
	$scope.notFound = false;
	Lembretes.read().then(function(data){
		$scope.lembretes = data.data;
        /*logica verificar data do dia e data da viagem */
        if(1){
        navigator.geolocation.getCurrentPosition(function(sucess){
                    var crd_lat = parseFloat(sucess.coords.latitude).toFixed(7);
                    var crd_lng = parseFloat(sucess.coords.longitude).toFixed(7);
            
                initMap(parseFloat(crd_lat), parseFloat(crd_lng));
        });
        }else{
                    
                    var crd_lat = data.data[0].latitude;
                    var crd_lng = data.data[0].longitude;
                initMap(crd_lat, crd_lng);
        }
        
        
        
		if(data.data.length == 0){
			$scope.notFound = true;
		}
	},function(data){
		console.log("data", data);
	});

	$scope.deletar = function(id){
		Lembretes.delete(id).then(function(data){
			console.log(data);
			$route.reload();
		});	
	}
});	

App.controller('ReadCtrlTravel', function($scope, Viagem, $route){
	$scope.viagens = [];
    
  
      $( "#img" ).slideUp();
      $( "#maps" ).slideUp();
      $( "#openMap" ).slideUp();
      $( "#tops" ).slideUp();
  
    
     

	$scope.notFound = false;
	Viagem.read().then(function(data){
		$scope.viagens = data.data;
		if(data.data.length == 0){
			$scope.notFound = true;
		}
	},function(data){
		console.log("data", data);
	});
    
    
    
	$scope.delet_travel = function(id){
		Viagem.delete(id).then(function(data){
			console.log(data);
			$route.reload();
		});	
	}

});

App.controller('CreateCtrl', function($scope, Lembretes, $location){
	$scope.cadastrar = function(titulo){
		var data = {
			titulo: titulo
		};

		Lembretes.create(data).then(function(data){
			$location.path('/');
            $route.reload();
		});
	}
});	

App.controller('EditCtrl', function($scope, Lembretes,Viagem,  $routeParams, $location){
	var id = $routeParams.id;
    
    console.log($routeParams.url);
    
	Lembretes.profile(id).then(function(data){
		$scope.item = data.data;
        $route.reload();
        
	})

	$scope.atualizar = function(item){
		console.log(item);
		Lembretes.update(item, item.id).then(function(data){
			$location.path('/');
		});
	}
});	


App.controller('EditTravelCtrl', function($scope, Viagem, $route, $routeParams, $location){
	var id = $routeParams.id;
    
   
    
	Viagem.profile(id).then(function(data){
		$scope.item = data.data;                
	})

	$scope.atualizar = function(item){
		console.log(item);
		Viagem.update(item, item.id_travel).then(function(data){
			$location.path('/viagens');
		});
	}
});	


App.controller('controllerSignUp', function($scope, Login, Viagem, $route, $routeParams, $location){
	$scope.loginFb = function(){
        alert("entrou");
        Login.read().then(function(data){
		$scope.dados = data.data;
       
		if(data.data.length == 0){
			$scope.notFound = true;
		}
	},function(data){
		console.log("data", data);
	});
    
    };
});	


App.controller('AdminUserCtrl', ['$scope', '$location', '$window', 'UserService', 'AuthenticationService',
    function AdminUserCtrl($scope, $location, $window, UserService, AuthenticationService) {
 
        //Admin User Controller (login, logout)
        $scope.logIn = function logIn(username, password) {
            if (username !== undefined && password !== undefined) {
 
                UserService.logIn(username, password).success(function(data) {
                
                    AuthenticationService.isLogged = true;
                    $window.sessionStorage.token = data.token;
                    $location.path("/viagens");
                }).error(function(status, data) {
                    console.log(JSON.stringify(data));
                    $location.path("/message/1");
                    
                                                            
                });
            }
        }
 
        $scope.logout = function logout() {
            if (AuthenticationService.isLogged) {
                AuthenticationService.isLogged = false;
                delete $window.sessionStorage.token;
                $location.path("/");
            }
        }
    }
]);
 