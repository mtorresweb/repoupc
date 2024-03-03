//import dependencies
const jwt = require("jwt-simple");
const moment = require("moment");

//secret key
const secretKey = "ULTRA_SECRET_KEY_FOR_UPCSA_REPO_1234";

//create a token
const createToken = (user) => {
  const payload = {
    id: user._id,
    nick: user.nick,
    email: user.email,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(30, "days").unix(),
  };

  //return token
  return jwt.encode(payload, secretKey);
};

module.exports = {
  secretKey,
  createToken,
};
