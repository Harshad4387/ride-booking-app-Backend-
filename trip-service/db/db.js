const mongoose = require("mongoose");
require('dotenv').config();
const connect = async()=>{
    try{
        const connection = await mongoose.connect(`${process.env.MONGO_URL}/trip-service`);
        console.log("database connected succesfully");
  
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {connect};