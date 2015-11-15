// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '435532409982894', // your App ID
		'clientSecret' 	: '8a91322c93cbe9229aa47f575065b74c', // your App Secret
		'callbackURL' 	: 'http://web.travelmanager.rhcloud.com/auth/facebook/callback'
	}

};