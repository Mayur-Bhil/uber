const dotenv = require("dotenv")
dotenv.config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.routes")
const captainRoutes = require("./routes/captain.routes")
const app = express();
const cookieParser = require('cookie-parser');
const connectDB = require("./db/db")

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use("/users",userRoutes);
app.use("/captains",captainRoutes);



app.get('/', (req, res) => {
    res.send('Hello World');
});



module.exports = app