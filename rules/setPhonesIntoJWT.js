function (user, context, callback) {
  // TODO: implement your rule
  user.phone1 = user.user_metadata.phone1;
  user.phone2 = user.user_metadata.phone2;
  callback(null, user, context);
}