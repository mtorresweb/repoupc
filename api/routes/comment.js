const express = require("express");
const router = express.Router();
const check = require("../middlewares/auth.js");

const commentController = require("../controllers/comment.js");

router.get("/list/:repository/:page?", check.auth, commentController.list);
router.post("/create", check.auth, commentController.create);

module.exports = router;
