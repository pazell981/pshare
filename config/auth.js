module.exports = {

	'facebookAuth' : {
		'clientID' 		: '475092382630434',
		'clientSecret' 	: process.env.FACEBOOK,
		'callbackURL' 	: 'http://rememberwhenwe.elasticbeanstalk.com/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'kkigdCeqSFJjQZi6mgvJDdVZ3',
		'consumerSecret' 	: process.env.TWITTER,
		'callbackURL' 		: 'http://rememberwhenwe.elasticbeanstalk.com/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: '609171465478-vrbbvlrcl7u4h00atnc8ufg81vpkghtc.apps.googleusercontent.com',
		'clientSecret' 	: process.env.GOOGLE,
		'callbackURL' 	: 'http://rememberwhenwe.elasticbeanstalk.com/auth/google/callback'
	}

};