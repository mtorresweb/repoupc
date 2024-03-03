const Request = require("../models/Request.js");
const Repository = require("../models/Repository.js");
const { changeState } = require("./repository.js");
const {
  validateRequestCreation,
  ValidateRequestReply,
} = require("../helpers/validation.js");

//creates a request
const create = async (req, res) => {
  //get user and repository from body
  let requestData = req.body;

  //validate request params
  let isValidRequest = validateRequestCreation(requestData);
  if (!isValidRequest) {
    return res.status(403).send({
      status: "error",
      message: "Invalid request",
    });
  }

  //validate repository
  try {
    let repo = Repository.findById(requestData.repository);
    if (!repo) {
      return res.status(404).send({
        status: "error",
        message: "repository not found",
      });
    }
  } catch {
    return res.status(500).send({
      status: "error",
      message: "error validating repository",
    });
  }

  requestData.user = req.user.id;

  //save request
  let request = new Request(requestData);
  request
    .save()
    .then(() => {
      return res.status(200).send({
        status: "success",
        message: "request saved successfully",
      });
    })
    .catch(() => {
      return res.status(500).send({
        status: "error",
        message: "error saving request",
      });
    });
};

//gets an individual request (only for admin)
const getRequest = async (req, res) => {
  //checks if user is admin
  if (req.user.role !== "admin") {
    return res.status(403).send({
      status: "error",
      message: "You are not allowed",
    });
  }

  try {
    let request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).send({
        status: "error",
        message: "request not found",
      });
    }
    return res.status(200).send({
      status: "success",
      request,
    });
  } catch {
    return res.status(500).send({
      status: "error",
      message: "error getting request",
    });
  }
};

//gets an individual request (only identified user's requests)
const getUserRequest = async (req, res) => {
  try {
    let request = await Request.findById(req.params.id).select({
      admin: false,
      __v: false,
    });
    if (!request) {
      return res.status(404).send({
        status: "error",
        message: "request not found",
      });
    }

    if (request.user != req.user.id) {
      return res.status(403).send({
        status: "error",
        message: "you are not allowed to access this",
      });
    }

    let requestToReturn = { ...request._doc };
    delete requestToReturn.user;
    return res.status(200).send({
      status: "success",
      request: requestToReturn,
    });
  } catch {
    return res.status(500).send({
      status: "error",
      message: "error getting request",
    });
  }
};

//reply a request (only for admin)
const reply = async (req, res) => {
  //checks if user is admin
  if (req.user.role !== "admin") {
    return res.status(403).send({
      status: "error",
      message: "You are not allowed",
    });
  }

  //validates data
  let data = ValidateRequestReply({
    status: req.body.status,
    reply: req.body.reply,
    request: req.body.request,
  });

  if (!data) {
    return res.status(400).send({
      status: "error",
      message: "invalid params",
    });
  }

  //validate repository, update repository status and update request parameters
  try {
    //finds the request
    let request = await Request.findById(req.body.request);

    //add the repository id to req.body
    req.body.repository = request.repository;

    //validate repository
    let repo = await Repository.findById(req.body.repository);
    if (!repo) {
      return res.status(500).send({
        status: "error",
        message: "could not find repository",
      });
    }

    //updates the request
    await Request.findOneAndUpdate(
      { _id: req.body.request },
      { admin: req.user.id, reply: req.body.reply, status: req.body.status }
    );

    //changes the status of the repository
    await changeState(req, res);
  } catch {
    return res.status(500).send({
      status: "error",
      message: "error replying request",
    });
  }
};

module.exports = {
  create,
  reply,
  getRequest,
  getUserRequest,
};
