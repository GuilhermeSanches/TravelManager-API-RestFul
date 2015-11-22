
exports.read = function(req, res) {

    
	req.getConnection(function(err,connection){
		connection.query('SELECT l.id_viagem, l.titulo, l.dataInicio, l.dataTermino, l.vPrevisto, sum( d.valor)as vGasto , l.status, l.id_user, l.token FROM viagens l JOIN usuarios u ON l.id_user = u.id  LEFT JOIN despesas d ON d.id_viagem = l.id_viagem  WHERE l.token = ? group by 1,2,3,4,5,7,8,9',[req.token],function(err,result){
			if(err) return res.status(400).json();
			return res.status(200).json(result);
		});
	});
}

exports.create = function(req, res) {
 	var data = req.body;
    console.log(data);
    
    req.getConnection(function(err,connection){
		connection.query('SELECT * FROM usuarios WHERE token = ?',[data.token],function(err,result){
            if(err) return res.status(404).json(err);
			   var iduser = result[0].id;
            
            
        req.getConnection(function(err,connection){
		connection.query('INSERT INTO viagens SET ?',[data],function(err,result){
			if(err) return res.status(400).json(err);
                var idViagem = result.insertId;

			
            
        req.getConnection(function(err,connection){
		connection.query("UPDATE viagens SET id_user = ? WHERE id_viagem = ? ",[iduser, idViagem],function(err,result){
			if(err) return res.status(404).json(err);	                                                   
			     return res.status(200).json({data: 'sucesso'});            
        })});
                        })});
        })});

}
    
    



exports.profile = function(req, res) {
 	var id = req.params.id;

	req.getConnection(function(err,connection){
		connection.query('SELECT * FROM viagens WHERE id_viagem = ?',[id],function(err,result){
			if(err) return res.status(400).json(err);
			return res.status(200).json(result[0]);
		});
	});
}

exports.update = function(req, res) {
 	var data = req.body,
 		id 	   = req.params.id;

	req.getConnection(function(err,connection){
		connection.query('UPDATE viagens SET ? WHERE id_viagem = ? ',[data, id],function(err,result){
			if(err) return res.status(400).json(err);
			return res.status(200).json(result);
		});
	});
}

exports.delete = function(req, res) {
 	var id = req.params.id;

	req.getConnection(function(err,connection){
		connection.query('DELETE FROM viagens WHERE id_viagem = ? ',[id],function(err,result){
			if(err) return res.status(400).json(err);

			return res.status(200).json(result);
		});
	});
}
 