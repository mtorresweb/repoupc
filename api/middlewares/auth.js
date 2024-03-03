//import dependencies
const jwt = require("jwt-simple");
const moment = require("moment");

//import secret key
const { secretKey } = require("../helpers/jwt.js");

//create middleware
exports.auth = (req, res, next) => {
  //check if the user is authenticated
  if (!req.headers.authorization) {
    return res.status(403).send({
      status: "error",
      message: "authorization header required",
    });
  }

  //clean token
  let token = req.headers.authorization.replace(/['"]+/g, "");

  try {
    //decode token
    let payload = jwt.decode(token, secretKey);

    //verify if token is expired
    if (payload.exp <= moment().unix()) {
      return res.status(404).send({
        status: "error",
        message: "token is expired",
      });
    }

    //add user data to request
    req.user = payload;
  } catch {
    return res.status(404).send({
      status: "error",
      message: "invalid token",
    });
  }

  next();
};
