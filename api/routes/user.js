const express = require("express");
const router = express.Router();
const check = require("../middlewares/auth.js");

const userController = require("../controllers/user.js");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile/:id", check.auth, userController.profile);
router.put("/update", check.auth, userController.update);
router.get("/avatar/:file", check.auth, userController.avatar);
router.put("/changeStatus", check.auth, userController.changeStatus);

module.exports = router;
