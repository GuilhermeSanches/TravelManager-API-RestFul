exports.signUp = function(req, res) {
    var username = req.body.user;
    var password = req.body.pass;
    var user = req.body;
    var jwt = require('jsonwebtoken');
    var jwtTokenSecret =  'vibevendasehfodapracrlaee';
    var token = jwt.sign(user, jwtTokenSecret, { expiresInMinutes: 60 }); 
    
    if (username === '' || password === '') {        
        return res.send(401);
    }    
    req.getConnection(function(err,connection){
		connection.query('SELECT * FROM usuarios WHERE user = ?',[username],
       function(err, result){            
			if(err) return res.status(400).json(err+username+password);
            if(result[0]) return res.status(404).json({data: "Usuário já existe!"});

            
    req.getConnection(function(err, connection){
		connection.query("INSERT INTO usuarios SET user = ? , pass = ? ",[username, password],function(err, result){    
            if(err) return res.status(400).json(err);
        
	                     
                
            
    req.getConnection(function(err,connection){
		connection.query("UPDATE usuarios SET token = ? WHERE user = ? ",[token, username],function(err,result){
			if(err) return res.status(400).json(err);	                                                   
			return res.status(200).json(
                                {token:token,
                                 user:user,
                                 type: true,
                                 result: result
                                });
                    		});
        	               });
            		});   
	               
              });
	       });    
	});      
         
                                         
 }
 