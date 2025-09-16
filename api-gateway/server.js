require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
// app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "API Gateway server for ride booking app is running fine  " });
});


const proxyOptions = (target) => ({
  target,
  changeOrigin: true,
  timeout: 5000,      
  proxyTimeout: 5000,  
  pathRewrite: {       
    "^/drivers": "",
    "^/riders": "",
    "^/payements": "",
    "^/trips": ""
  },
  onError: (err, req, res) => {
    console.error("Proxy error:", err.message);
    res.status(502).json({ error: "Bad gateway. Target service not responding." });
  }
});


app.use("/drivers", createProxyMiddleware(proxyOptions(process.env.DRIVER_SERVER_URL)));
app.use("/riders", createProxyMiddleware(proxyOptions(process.env.RIDER_SERVER_URL)));
app.use("/payements", createProxyMiddleware(proxyOptions(process.env.PAYMENT_SERVER_URL)));
app.use("/trips", createProxyMiddleware(proxyOptions(process.env.TRIP_SERVER_URL)));

const port = process.env.PORT || 3019;
app.listen(port, () => {
  console.log(`🚦 API Gateway running on port ${port} ~ built harshu `);
});
