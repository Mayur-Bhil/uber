const { validationResult } = require('express-validator');
const captainService = require('../services/captain.services.js');
const captainModel = require('../models/captain.model.js');
const blacklistTokenModel = require('../models/blacklistToken.model.js');




module.exports.registerCaptain = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    try {
        const { fullname, email, password,vehicle } = req.body;

        const isalreadyExist = await captainModel.findOne({ email });
        if (isalreadyExist) {
            return res.status(400).json({ message: "Captain Already Exist" });
        }

        const hashedPassword = await captainModel.hashedPassword(password);

        const captain =  await captainService.createCaptain({
            firstname:fullname.firstname,
            lastname:fullname.lastname,
            email,
            password:hashedPassword,
            color:vehicle.color,
            plate:vehicle.plate,
            capacity:vehicle.capacity,
            vehicleType:vehicle.vehicleType
            
        });
        const token = captain.generateAuthToken();
        return res.status(201).json({ message: "Captain Created Successfully", captain, token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.loginCaptain = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    try {
        const { email, password } = req.body;
        const captain = await captainModel.findOne({ email }).select("+password");
        if (!captain) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const isMatch = await captain.ComaprePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = captain.generateAuthToken();
        res.cookie("token", token)
        return res.status(200).json({ message: "Captain Logged In Successfully", captain, token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.getCaptainProfile = async (req, res) => {
    try {
        const captain = await captainModel.findById(req.captain._id).select("-password");
        if (!captain) {
            return res.status(404).json({ message: "Captain Not Found" });
        }
        return res.status(200).json({ message: "Captain Profile", captain });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    await blacklistTokenModel.create({ token });
    res.clearCookie("token");
    return res.status(200).json({ message: "Captain Logged Out Successfully" });

}