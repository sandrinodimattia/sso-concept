function login(username, password, callback) {

  var request = require('request');

  // const IDP_ENDPOINT = "http://localhost:3001/pasaload/api/Authentication/";
  var IDP_ENDPOINT = configuration.ENDPOINT_LOCAL + "/pasaload/api/Authentication/";
  // var IDP_ENDPOINT = "https://staging.pldthome.com/pasaload/api/Authentication/";
  //
  if ('placeholder@fake.com' === username) {
    console.log('Suppress login...');
    return callback();
  }

  // DEBUG ONLY - test
  console.log('username: ' + username);
  console.log('password: ' + password);

  request.get({
    url: IDP_ENDPOINT + '?username=' + username + '&password=' + password
  }, function (err, response, body) {
    console.log('@@@@@');
    console.log('LOGIN: Response status code: ' + response.statusCode);
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
