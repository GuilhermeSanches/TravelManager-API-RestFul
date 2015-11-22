
exports.read = function(req, res) {

    
	req.getConnection(function(err,connection){
		connection.query('SELECT l.titulo, l.dataInicio, l.dataTermino, l.vPrevisto, sum( d.valor)as vGasto , l.status, l.id_user, l.token FROM lembretes l JOIN usuarios u ON l.id_user JOIN despesas d ON d.id_viagem = l.id_lembrete WHERE l.token = ?',[req.token],function(err,result){
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
		connection.query('INSERT INTO lembretes SET ?',[data],function(err,result){
			if(err) return res.status(400).json(err);
                var idLembrete = result.insertId;

			
            
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
 