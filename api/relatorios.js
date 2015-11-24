exports.read = function(req, res) {

	var idViagem = req.params.id;
    
	req.getConnection(function(err,connection){
		connection.query('select nome, coalesce(t1.valor, 0)as valor from categoria c left join(select coalesce(sum(d.valor), 0)as valor, d.id_categoria from despesas d WHERE d.id_viagem = ? GROUP BY 2 )as t1 on c.id = t1.id_categoria order by 1',[idViagem],function(err,result){
			if(err) return res.status(400).json();
			return res.status(200).json(result);
		});
	});
}



exports.readRelTot = function(req, res) {

	
    
	req.getConnection(function(err,connection){
		connection.query('select v.titulo, sum(d.valor) as valor from viagens v join despesas d on d.id_viagem = v.id_viagem where v.token = ? group by 1',[req.token],function(err,result){
			if(err) return res.status(400).json();
			return res.status(200).json(result);
		});
	});
}



