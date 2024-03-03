const express = require("express");
const router = express.Router();
const check = require("../middlewares/auth.js");

const requestController = require("../controllers/request.js");

router.post("/create", check.auth, requestController.create);
router.get("/get/:id", check.auth, requestController.getRequest);
router.get("/getMine/:id", check.auth, requestController.getUserRequest);

module.exports = router;
