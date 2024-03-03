const { reply } = require("./request.js");
//reply a request
const replyRequest = async (req, res) => {
  //checks if user is admin
  if (req.user.role !== "admin") {
    return res.status(403).send({
      status: "error",
      message: "You are not allowed",
    });
  }
  try {
    await reply(req, res);
  } catch {
    return res.status(500).send({
      status: "error",
      message: "Error replying request",
    });
  }
};

module.exports = {
  replyRequest,
};
