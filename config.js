if(process.env.NODE_ENV !== 'production') {
	module.exports.keys = {
	  gitHubClientId: '2bf2f840356d251d928c',
	  gitHubSecretKey: 'c606d2126dd0ea186e3dda5d53f1646bf778cc10',
	  gitCallbackUrl: 'http://localhost:3000/callback'
	}
} else {
	module.exports.keys = {
	  gitHubClientId: 'be4f2a819bbef0952190',
	  gitHubSecretKey: 'da981589964840953f2282463d604dd9639ad879',
	  gitCallbackUrl: 'http://beacondev.herokuapp.com/callback'
	}
}
