const userModel = require("../models/user.model");
const userService = require("../services/user.services");
const { validationResult } = require("express-validator");
const BlacklistToken = require("../models/blacklistToken.model.js");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password } = req.body;

  console.log(req.body);
  

  const hashedpassword = await userModel.hashedPassword(password);
  const AlreadyExist = await userModel.findOne({ email });
  
  if (AlreadyExist) {
    throw new Error("User Already Exist");
  } 

  const user = await userService.createUser({
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,
    password: hashedpassword,
  });

  const token = user.generateAuthToken();

  res.status(201).json({token,user})
};

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map((err) => err.msg) });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({ message: "invalid email or password" });
    }
    const isMatch = await user.ComaprePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = user.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({ token, user });
}

module.exports.getUserProfile = async (req, res, next) => {
    const user = await userModel.findById(req.user._id).select("-password");
    if (!user) {
        return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json(user);
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie("token"); // Clear the cookie
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    } 
    await BlacklistToken.create({ token });
    res.status(200).json({ message: "Logged Out" });
}