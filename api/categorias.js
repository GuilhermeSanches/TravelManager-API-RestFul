exports.read = function(req, res) {

	req.getConnection(function(err,connection){
		connection.query('SELECT * FROM categoria',function(err,result){
			if(err) return res.status(400).json();
			return res.status(200).json(result);
		});
	});
}
