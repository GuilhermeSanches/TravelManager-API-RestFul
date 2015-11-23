exports.read = function(req, res) {

	var idViagem = req.params.id;
    
	req.getConnection(function(err,connection){
		connection.query('SELECT c.nome, coalesce(sum(d.valor), 0)as valor FROM `categoria` c left join despesas d on c.id = d.id_categoria WHERE d.id_viagem = ? or d.id_categoria is null group by 1 order by 1',[idViagem],function(err,result){
			if(err) return res.status(400).json();
			return res.status(200).json(result);
		});
	});
}