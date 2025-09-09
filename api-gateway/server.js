require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const {createProxyMiddleware} = require('http-proxy-middleware');
app.use(express.json());
app.use(morgan("dev"));
app.get("/" , (req,res)=>{
    res.json("api gateway server of ride booking app is working fine on port 3000");
})
app.use("/drivers" , createProxyMiddleware({target : process.env.DRIVER_SERVER_URL ,  changeOrigin  : true}));
app.use("/riders" , createProxyMiddleware({target : process.env.RIDER_SERVER_URL , changeOrigin : true}));
app.use("/payements" , createProxyMiddleware ({target : process.env.PAYMENT_SERVER_URL , changeOrigin : true}));
app.use("/trips" , createProxyMiddleware ({target : process.env.TRIP_SERVER_URL , changeOrigin : true}));
port = process.env.PORT || 3019 ;
app.listen(port , ()=>{
    console.log(` api gateway server is running on port ${port} ~ made by harshu` );
})
