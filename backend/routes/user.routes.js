const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First Name Must  bbe at least 3characetrs long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password Should me 6 characters Long"),
  ],
  userController.registerUser
);


router.post('/login',[
    body("email").isEmail().withMessage("invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password Should me 6 characters Long"),
],userController.loginUser) 

router.get("/profile", authMiddleware.authUser, userController.getUserProfile);

router.get("/logout",authMiddleware.authUser,userController.logoutUser)


module.exports = router;
