exports.read = function(req, res) {

	var idViagem = req.params.id;
    
	req.getConnection(function(err,connection){
		connection.query('select nome, coalesce(t1.valor, 0)as valor from categoria c left join(select coalesce(sum(d.valor), 0)as valor, d.id_categoria from despesas d where d.id_viagem = 48)as t1 on c.id = t1.id_categoria order by 1',[idViagem],function(err,result){
			if(err) return res.status(400).json();
			return res.status(200).json(result);
		});
	});
}


