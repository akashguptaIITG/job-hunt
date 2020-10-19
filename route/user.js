const userController = require("../controller/user");
const router = require("express").Router();
// rendering register view
router.get("/register", userController.getRegisterPage);

// creates a user
router.post("/", userController.addUser);

// rendering login view
router.get("/login", userController.getLoginPage);

// verifying login
router.post("/login", userController.checkLogin);

module.exports = router;
