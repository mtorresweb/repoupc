const validator = require("validator");
const fs = require("fs");

//validate data when creating an user
const validateParams = (params) => {
  const allowedKeys = [
    "email",
    "nick",
    "password",
    "notifications_config",
    "description",
    "image",
  ];

  const result = Object.keys(params).every((key) => allowedKeys.includes(key));

  return result;
};

const validateParamsRegister = (params) => {
  const allowedKeys = ["email", "nick", "password"];

  const result = Object.keys(params).every((key) => allowedKeys.includes(key));

  return result;
};

const validateRegister = (params) => {
  if (!validateParamsRegister(params)) {
    console.log("invalid key detected");
    return false;
  }

  let password = validator.isStrongPassword(params.password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  });
  let email =
    !validator.isEmpty(params.email) && validator.isEmail(params.email);
  let nick =
    !validator.isEmpty(params.nick) &&
    validator.isLength(params.nick, { min: 3, max: undefined });

  if (!email || !nick || !password) {
    return false;
  }
  return true;
};

const validateData = async (params) => {
  if (!validateParams(params)) {
    console.log("invalid key detected");
    return false;
  }

  /* let password = validator.isStrongPassword(params.password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  }); */
  let email =
    !validator.isEmpty(params.email) && validator.isEmail(params.email);
  let nick =
    !validator.isEmpty(params.nick) &&
    validator.isLength(params.nick, { min: 3, max: undefined });

  let notifications = true;
  if (params.notifications_config) {
    notifications =
      params.notifications_config === "all" ||
      params.notifications_config === "none"
        ? true
        : false;
  }

  let image = true;

  let validateImage = new Promise((resolve) => {
    const filePath = "./uploads/avatars/" + params.image;

    //check if file exists
    fs.stat(filePath, (error, exists) => {
      if (exists && !error) {
        resolve(true);
      }
      if (error || !exists) {
        resolve(false);
      }
    });
  });

  try {
    if (params.image) {
      image = await validateImage;
    }
    if (!email || !nick || !notifications || !image) {
      return false;
    }
    return true;
  } catch {
    console.log("error getting image");
  }
};

//validate data when creating a comment
const validateCommentParams = (params) => {
  const allowedKeys = ["content", "rate", "repository"];

  const result = Object.keys(params).every((key) => allowedKeys.includes(key));

  return result;
};

const validateComment = (comment) => {
  if (!validateCommentParams(comment)) {
    return false;
  }
  if (![1, 2, 3, 4, 5].includes(parseInt(comment.rate))) {
    return false;
  }
  return true;
};

//validate data when creating or updating a repository
const validateRepositoryParams = (params) => {
  const allowedKeys = ["description", "title", "link", "tags", "type"];

  const result = Object.keys(params).every((key) => allowedKeys.includes(key));

  return result;
};

const validateRepository = (repository) => {
  if (!validateRepositoryParams(repository)) {
    return false;
  }
  let title = validator.isLength(repository.description, {
    min: 5,
    max: undefined,
  });
  let description = validator.isLength(repository.description, {
    min: 5,
    max: undefined,
  });
  let link = validator.isURL(repository.link);
  let type = [
    "proyecto de aula",
    "proyecto de investigación",
    "proyecto de grado",
  ].includes(repository.type);

  if (!title || !description || !link || !type) {
    return false;
  }

  return true;
};

const validateChangeStatus = (status) => {
  if (status != "aprobado" && status != "denegado") {
    return false;
  }

  return true;
};

//validate data when creating or replying a request
const validateRequestCreation = (request) => {
  const allowedKeys = ["repository"];

  const result = Object.keys(request).every((key) => allowedKeys.includes(key));

  return result;
};

const ValidateRequestReply = (request) => {
  const allowedKeys = ["reply", "status", "request"];

  const result = Object.keys(request).every((key) => allowedKeys.includes(key));

  if (!result || !request.reply || !request.status || !request.request) {
    return false;
  } else if (request.status != "aprobado" && request.status != "denegado") {
    return false;
  }

  return true;
};

module.exports = {
  validateData,
  validateParams,
  validateComment,
  validateRepository,
  validateChangeStatus,
  validateRequestCreation,
  ValidateRequestReply,
  validateRegister,
};
