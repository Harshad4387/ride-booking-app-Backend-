const Driver = require("../models/driver.model");
const generateToken = require("../../common/utils/generatetoken");

const signup = async (req, res) => {
  try {
    const { name, email, password, phone, vehicle, location } = req.body;
    // console.log(req.body);

    if (!name || !email || !password || !phone || !vehicle || !location) {
      return res.status(400).json({ message: "all fields are required" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "password should be at least 8 characters" });
    }

    const user = await Driver.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "driver already registered" });
    }

    const userdata = {
      name,
      email,
      password,
      phone,
      vehicle,
      location,
    };

    const newuser = new Driver(userdata);
    await newuser.save();

    const token = await generateToken(newuser._id , res);

    res
      .status(201)
      .json({ message: "Driver registered successfully", driver: newuser, token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = signup;
