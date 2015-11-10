        exports.getMessages = function(req, res) {
    var id = req.params.id;

	req.getConnection(function(err,connection){
		connection.query('SELECT * FROM messages WHERE id = ?',[id],function(err,result){
			if(err) return res.status(400).json();
			return res.status(200).json(result[0]);
		});
	});
}