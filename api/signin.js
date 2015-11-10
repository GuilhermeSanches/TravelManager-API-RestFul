exports.authenticate = function(req, res) {
    var username = req.body.user;
    var password = req.body.pass;
 
    if (username === '' || password === '') {        
        return res.send(401);
    }    
    req.getConnection(function(err,connection){
		connection.query('SELECT * FROM usuarios WHERE user = ? and pass = ?',[username, password],function(err,result){
  if(err) return res.status(400).json(err);   
    if(!result[0]) return res.status(401).json({data: "usuário nao encontrado, favor fazer sign-up"});
    return res.status(200).json({
                 data: result[0],
                 token: result[0].token
                  });
		});
	});                                                     
 }
 