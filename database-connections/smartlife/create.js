function create(user, callback) {

  // DEBUG ONLY - test
  console.log('@@@@@@@@@@');
  console.log('user: ' + JSON.stringify(user));

  var request = require('request');

  // const IDP_ENDPOINT = "https://localhost:3001/pasaload/api/registration";
  var IDP_ENDPOINT = configuration.ENDPOINT_LOCAL + "/pasaload/api/registration";
  // const IDP_ENDPOINT = 'https://staging.pldthome.com/pasaload/api/registration',

  // console.log(JSON.stringify(user));
  if ('placeholder@fake.com' === user.email) {
    console.log('Removing placeholder email...');
    user.email = null;
  }

  user.user_metadata = user.user_metadata || {};

  request.post({
    url: IDP_ENDPOINT,
    json: {
      email: user.email,
      password: user.password,
      firstName: user.user_metadata.firstName,
      lastName: user.user_metadata.lastName,
      phone1: user.user_metadata.phone1,
      phone2: user.user_metadata.phone2
    }

  }, function (err, response, body) {
    console.log('@@@@@');
    console.log('CREATE: Response status code: ' + response.statusCode);
    if (err) {
      return callback(err);
    }
    if (response.statusCode != 200 && response.statusCode != 201) {
      return callback(new Error('Forbidden'));
    }
    console.log("Signup success!");
    callback(null, body);

  });
}