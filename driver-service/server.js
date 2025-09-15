require('dotenv').config();
const {connect} = require('./db/db');
connect();
const morgan = require('morgan');

const express = require('express');
const app = express();
app.use(express.json());
app.use(morgan("dev"))
const port = process.env.PORT || 3000 ;

const authroutes = require("./routes/auth.route");
app.use("/auth" , authroutes);
app.listen(port , ()=> {
    console.log(`server is running on port ${port}`);
}) 