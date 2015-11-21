exports.read = function(req, res) {
var id = req.params.id;
    
	req.getConnection(function(err,connection){
		connection.query('SELECT * FROM despesas l WHERE l.id_viagem = ?',[id],function(err,result){
			if(err) return res.status(400).json();
			return res.status(200).json(result);
		});
	});
}

