const mongoose = require("mongoose");

const riderSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },

  // Trip history will store Trip IDs only (from Trip Service)
  tripHistory: [
    {
      tripId: { type: String }, // reference to Trip Service
      fare: Number,
      status: { type: String, enum: ["completed", "cancelled", "ongoing"] },
      date: Date
    }
  ],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Rider", riderSchema);
