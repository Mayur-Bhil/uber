const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minLength:[3,"First NAme Must be at least 3 characters"]
        },
        lastname:{
            type:String,
            minLength:[3,"First NAme Must be at least 3 characters"]
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:[5,"Eamil Must be at least 5 Characters long"]
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    soketId:{
        type:String
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{
        expiresIn:"1d"
    });
    return token
}



userSchema.statics.hashedPassword = async function(password){
    return await bcrypt.hash(password,10)
}

userSchema.methods.ComaprePassword = async function(hashedPassword){
    return await bcrypt.compare(hashedPassword,this.password)
}       
userModel = mongoose.model("user",userSchema)
module.exports = userModel