exports.read = function(req, res) {
var id = req.params.id;
    
	req.getConnection(function(err,connection){
		connection.query('SELECT l.id, l.valor, l.id_viagem, c.nome, l.data FROM despesas l join categoria c on c.id = l.id_categoria WHERE l.id_viagem = ?',[id],function(err,result){
			if(err) return res.status(400).json();
			return res.status(200).json(result);
		});
	});
}

