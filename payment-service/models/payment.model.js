const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  tripId: { type: String, required: true },   // Trip ID from Trip Service
  riderId: { type: String, required: true },  // Rider ID from Rider Service
  driverId: { type: String, required: true }, // Driver ID from Driver Service

  amount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },

  method: { type: String, enum: ["card", "upi", "wallet", "cash"], default: "cash" },
  transactionDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", paymentSchema);
