const captainModel = require("../models/captain.model.js");


module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  if (!firstname || !email || !password) {
    throw new Error("All Fields Are Required !");
  }
  const captain = await captainModel.create({
    fullname: {
      firstname,
      lastname,   
    },
    email,
    password,
    vehicle: {  
      color,
      plate,
      capacity,
      vehicleType,
    },    
  });

  return captain;
};
