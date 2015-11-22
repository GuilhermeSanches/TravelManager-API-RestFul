var express = require('express');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var app = express.Router();
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
 

app.route('/viagem/:id/lancamentos')
    .get(ensureAuthorized, Lancamentos.read)
    .post(ensureAuthorized, Lancamentos.create);

app.route('/viagem/:idViagem/lancamento/:id')
    .delete(ensureAuthorized, Lancamentos.delete);


app.route('/viagens')
	.get(ensureAuthorized, Viagens.read)
	.post(ensureAuthorized, Viagens.create);

    
app.route('/viagem/:id')
	.get(Viagens.profile)
	.put(Viagens.update)
	.delete(Viagens.delete);


app.route('/message/:id').get(Messages.getMessages);




    module.exports = app;
