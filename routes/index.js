var express = require('express');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var app = express.Router();
var Lembretes = getmodule('api/lembrete');
var Viagens = getmodule('api/viagem');
var Messages = getmodule('api/messages');
var SignIn = getmodule('api/signin');
var SignUp = getmodule('api/signup');
var Lancamentos = getmodule('api/lancamentos');


function ensureAuthorized(req, res, next) {

var bearerToken;
    var bearerHeader = req.headers['authorization'];
    if (bearerHeader !== undefined) {
    console.log(JSON.stringify(req.headers));
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearer;        
        next();
    } else {
        res.send(403);
    }
};


app.route('/authenticate')
    .post(SignIn.authenticate);
    
    
app.route('/signup')
    .post(SignUp.signUp);
 

app.route('/lembrete/:id/lancamentos')
    .get(ensureAuthorized, Lancamentos.read);

app.route('/lembrete/:idViagem/lancamento/:id')
    .delete(ensureAuthorized, Lancamentos.delete);


app.route('/lembretes')
	.get(ensureAuthorized, Lembretes.read)
	.post(ensureAuthorized, Lembretes.create);

/*GET VIAGENS*/
app.route('/viagens')
    .get(ensureAuthorized, Viagens.getViagens);

app.route('/viagem/:id')
    .get(Viagens.profileViagem)
    .put(ensureAuthorized, Viagens.updateViagem)
    .delete(Viagens.deleteViagem);
    

app.route('/message/:id').get(Messages.getMessages);


app.route('/lembrete/:id')
	.get(Lembretes.profile)
	.put(Lembretes.update)
	.delete(Lembretes.delete);






    module.exports = app;
