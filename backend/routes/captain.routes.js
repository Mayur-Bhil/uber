const express = require("express");
const router = express.Router();    
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
    "/register",
    [
        body("fullname.firstname").isLength({ min: 3 }).withMessage("First Name Must be at least 3 characters"),
        body("email").isEmail().withMessage("Invalid Email"),
        body("password").isLength({ min: 6 }).withMessage("Password Must be at least 6 characters"),
        body("vehicle.color").isLength({ min: 3 }).withMessage("Color Must be at least 3 characters"),
        body("vehicle.plate").isLength({ min: 4 }).withMessage("Plate Number Must be at least 4 characters"),
        body("vehicle.capacity").isInt({ min: 1 }).withMessage("Capacity Must be at least 1"), // Added validation
        body("vehicle.vehicleType").isIn(["car", "motorcycle", "auto"]).withMessage("Invalid Vehicle Type")
    ],
    captainController.registerCaptain
);

router.post("/login",[
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Password Must be at least 6 characters"),
], captainController.loginCaptain)

router.get("/profile", authMiddleware.authCaptain,captainController.getCaptainProfile);

router.get("/logout", authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;