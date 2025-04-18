const mongoose = require("mongoose");


function connectDB(){
        mongoose.connect(process.env.CONNECTION_URI)
        .then(()=>{
            console.log('Connected To DB');
            
        })
        .catch((err)=>{
            console.log(err);
            
        })
}


module.exports = connectDB;