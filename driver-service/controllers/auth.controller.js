 const Driver = require("../models/driver.model");
const signup = async (req , res)=>{
    const {name , email , password , phone , vehicle  , location } = req.body ;
    if(!name || !email || !password || !phone || !vehicle || !location)
    {
        return res.status(400).json({message : "all feilds are required"});
    }
    if(password.length < 8){
        return res.status(400).json({message : "password should be atleast 8 character"});
    }
    const user = await Driver.findOne({email});
    if(user)
    {
        res.status(400).json({message : "driver already registered"});
    }
    const userdata = {
        name ,
        email ,
        password ,

    }
    // const newuser = {}
    

}
module.exports = signup;