require('dotenv').config();
const {connect} = require('./db/db');
connect();
const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000 ;
app.listen(port , ()=> {
    console.log(`server is running on port ${port}`);
}) 