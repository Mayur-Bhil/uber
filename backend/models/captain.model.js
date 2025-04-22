const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, "First Name Must be at least 3 characters"]
        },
        lastname: {
            type: String,
            minLength: [3, "Last Name Must be at least 3 characters"]
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
            },
            message: "Please Enter a valid email"
        }
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    soketId: {
        type: String
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    isCaptain: {
        type: Boolean,
        default: true
    },
    vehicle: {
        color: {
            type: String, // Fixed the typo here
            required: true,
            minLength: [3, "Color Must be at least 3 characters"]
        },
        plate: {
            type: String,
            required: true,
            minLength: [4, "Plate Number Must be at least 4 characters"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capicity Must be at least 1"]
        },
        vehicleType: {
            type: String,
            enum: ["car", "motorcycle", "auto"],
            required: true
        },
    },
    location: {
        lat: {
            type: Number,
        },
        long: {
            type: Number,
        }
    }
});

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_CAPTAIN, {
        expiresIn: "24h"
    });
    return token;
};

captainSchema.statics.hashedPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

captainSchema.methods.ComaprePassword = async function (hashedPassword) {
    return await bcrypt.compare(hashedPassword, this.password);
};

const captainModel = mongoose.model("captain", captainSchema);
module.exports = captainModel;