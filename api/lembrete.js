
exports.read = function(req, res) {

    
	req.getConnection(function(err,connection){
		connection.query('SELECT * FROM lembretes l join usuarios u on l.id_user = u.id WHERE u.token = ?',[req.token],function(err,result){
			if(err) return res.status(400).json();
			return res.status(200).json(result);
		});
	});
}

exports.create = function(req, res) {
 	var data = req.body;
    console.log(data);
    
    req.getConnection(function(err,connection){
		connection.query('SELECT id FROM usuarios WHERE token = ?',[data.token],function(err,result){
            if(err) return res.status(404).json(err);
			   var iduser = result.id;
            
            
        req.getConnection(function(err,connection){
		connection.query('INSERT INTO lembretes SET ?',[data],function(err,result){
			if(err) return res.status(400).json(err);
                var idLembrete = result.id_lembrete;

			
            
        req.getConnection(function(err,connection){
		connection.query("UPDATE lembretes SET id_user = ? WHERE id_lembrete = ? ",[iduser, idLembrete],function(err,result){
			if(err) return res.status(404).json(err);	                                                   
			     return res.status(200).json({data: 'sucesso'});            
        })});
                        })});
        })});

}
    
    



exports.profile = function(req, res) {
 	var id = req.params.id;

	req.getConnection(function(err,connection){
		connection.query('SELECT * FROM lembretes WHERE id_lembrete = ?',[id],function(err,result){
			if(err) return res.status(400).json(err);
			return res.status(200).json(result[0]);
		});
	});
}

exports.update = function(req, res) {
 	var data = req.body,
 		id 	   = req.params.id;

	req.getConnection(function(err,connection){
		connection.query('UPDATE lembretes SET ? WHERE id_lembrete = ? ',[data, id],function(err,result){
			if(err) return res.status(400).json(err);
			return res.status(200).json(result);
		});
	});
}

exports.delete = function(req, res) {
 	var id = req.params.id;

	req.getConnection(function(err,connection){
		connection.query('DELETE FROM lembretes WHERE id_lembrete = ? ',[id],function(err,result){
			if(err) return res.status(400).json(err);

			return res.status(200).json(result);
		});
	});
}
 