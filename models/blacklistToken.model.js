const {mongoose,Schema,model} = require('mongoose');


const BlacklistTokenSchema = new Schema({
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