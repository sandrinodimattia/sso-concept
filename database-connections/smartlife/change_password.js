function changePassword(email, newPassword, callback) {

  // DEBUG ONLY -test
  console.log('email: ' + email);
  console.log('newPassword: ' + newPassword);

  var request = require('request');

  // const IDP_ENDPOINT = "http://localhost:3001/pasaload/api/forgotpassword";
  var IDP_ENDPOINT = configuration.ENDPOINT_LOCAL + "/pasaload/api/forgotpassword";
  // const IDP_ENDPOINT = 'https://staging.pldthome.com/pasaload/api/forgotpassword',

  var options = {
    method: 'PUT',
    url: IDP_ENDPOINT,
    headers:
    { 'cache-control': 'no-cache',
      'content-type': 'application/json'
    },
    body: { email: email },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) {
      throw new Error(error);
    }
    console.log("ChangePassword success!");
    // callback(null, body);

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
      },
    });

  });

}
