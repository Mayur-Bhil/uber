const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const captainModel = require("../models/captain.model.js");
const BlacklistTokenModel = require("../models/blacklistToken.model.js");


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const isBlackListedToken = await BlacklistTokenModel.findOne({ token });
    if (isBlackListedToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decoded._id).select("-password");
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const isBlackListedToken = await BlacklistTokenModel.findOne({ token });
    if (isBlackListedToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_CAPTAIN);
        req.captain = await captainModel.findById(decoded._id).select("-password");
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}