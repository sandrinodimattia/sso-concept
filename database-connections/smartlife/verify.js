function verify (email, callback) {

	var request = require('request');

	var IDP_ENDPOINT = configuration.ENDPOINT_LOCAL + "/pasaload/api/verify/";

	// DEBUG ONLY - test
	console.log('email: ' + email);

	request.get({
		url: IDP_ENDPOINT + '?email=' + email
	}, function (err, response, body) {
		console.log('@@@@@');
		console.log('VERIFY: Response status code: ' + response.statusCode);
		if (err) {
			return callback(err);
		}
		if (response.statusCode != 200) {
			return callback(new Error('Forbidden'));
		}
		console.log(body);
		var user = JSON.parse(body);

		callback(null, {
			user_id: user.id,
			email: user.email,
			given_name: user.firstName,
			family_name: user.lastName,
			email_verified: user.emailVerified,
			user_metadata: {
				phone1: user.phone1,
				phone2: user.phone2
			}
		});

	});

}

