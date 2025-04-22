const {default:mongoose} = require('mongoose');


const BlacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:864000 // 24 hours in seconds
    }
});


BlacklistTokenModel = mongoose.model('BlacklistToken', BlacklistTokenSchema);
module.exports = BlacklistTokenModel 