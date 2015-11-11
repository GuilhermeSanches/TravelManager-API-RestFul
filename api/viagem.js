exports.getViagens = function(req, res) {
	req.getConnection(function(err,connection){
		connection.query('SELECT * FROM viagens v join usuarios u on v.id_user = u.id where u.token = ?',[req.token],function(err,result){
			if(err) return res.status(400).json({data:"Nenhum dado encontrado para este usuário"});
			return res.status(200).json(result);
		});
	});
}


exports.updateViagem = function(req, res) {
 	var data = req.body,
 		id 	   = req.params.id;

	req.getConnection(function(err,connection){
		connection.query('UPDATE viagens SET ? WHERE id_travel = ? ',[data, id],function(err,result){
			if(err) return res.status(400).json(err);
			return res.status(200).json(result);
		});
	});
}


exports.profileViagem = function(req, res) {
 	var id = req.params.id;

	req.getConnection(function(err,connection){
		connection.query('SELECT * FROM viagens WHERE id_travel = ?',[id],function(err,result){
			if(err) return res.status(400).json(err);
			return res.status(200).json(result[0]);
		});
	});
}

exports.deleteViagem = function(req, res) {
 	var id = req.params.id;

	req.getConnection(function(err,connection){
		connection.query('DELETE FROM viagens WHERE id_travel = ? ',[id],function(err,result){
			if(err) return res.status(400).json(err);
			return res.status(200).json(result);
		});
	});
}
