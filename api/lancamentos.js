exports.read = function(req, res) {
var id = req.params.id;
    
	req.getConnection(function(err,connection){
		connection.query('SELECT l.id,    l.descricao, l.valor, l.id_viagem, c.nome, l.data FROM despesas l join categoria c on c.id = l.id_categoria WHERE l.id_viagem = ?',[id],function(err,result){
			if(err) return res.status(400).json();
			return res.status(200).json(result);
		});
	});
}


exports.profile = function(req, res) {
var id = req.params.id;
    
	req.getConnection(function(err,connection){
		connection.query('SELECT l.id,  l.descricao, l.valor, l.id_viagem, l.id_categoria, l.data FROM despesas l WHERE l.id = ?',[id],function(err,result){
			if(err) return res.status(400).json();
			return res.status(200).json(result);
		});
	});
}



exports.delete = function(req, res) {
 	var id = req.params.id;

	req.getConnection(function(err,connection){
		connection.query('DELETE FROM despesas WHERE id = ? ',[id],function(err,result){
			if(err) return res.status(400).json(err);

			return res.status(200).json(result);
		});
	});
}

exports.update = function(req, res) {
 	var data = req.body,
 		id 	   = req.params.id;

	req.getConnection(function(err,connection){
		connection.query('UPDATE despesas SET ? WHERE id = ? ',[data, id],function(err,result){
			if(err) return res.status(400).json(err);
			return res.status(200).json(result);
		});
	});
}
 
exports.create = function(req, res) {
 	var data = req.body;
    var idViagem = req.params.id;

        req.getConnection(function(err,connection){
		connection.query('INSERT INTO despesas SET ?',[data],function(err,result){
			if(err) return res.status(400).json(err);
                var idLancamento = result.insertId;

			
            
        req.getConnection(function(err,connection){
connection.query("UPDATE despesas SET id_viagem = ? WHERE id = ? ",[idViagem, idLancamento],function(err,result){
			if(err) return res.status(404).json(err);	                                                   
			     return res.status(200).json({data: 'sucesso'});            
                })});
            })});
   
}
    
