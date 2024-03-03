const express = require("express");
const router = express.Router();
const check = require("../middlewares/auth.js");

const adminController = require("../controllers/admin.js");

router.post("/reply", check.auth, adminController.replyRequest);

module.exports = router;
