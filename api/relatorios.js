exports.read = function(req, res) {

	var idViagem = req.params.id;
    
	req.getConnection(function(err,connection){
		connection.query('select sum(d.valor) as valor, c.nome from despesas d join categoria c on c.id = d.id_categoria where d.id_viagem = ? group by 2',[idViagem],function(err,result){
			if(err) return res.status(400).json();
			return res.status(200).json(result);
		});
	});
}