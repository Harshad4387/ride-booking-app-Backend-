const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  riderId: { type: String, required: true },          // comes from Rider Service
  driverId: { type: String },                  // comes from Driver Service

  pickupLocation: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true }
  },

  dropLocation: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true }
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
    default: "pending"
  },

  distance: { type: Number }, // in km
  fare: { type: Number },
  startedAt: Date,
  endedAt: Date,

  createdAt: { type: Date, default: Date.now }
});

tripSchema.index({ pickupLocation: "2dsphere" });
tripSchema.index({ dropLocation: "2dsphere" });

module.exports = mongoose.model("Trip", tripSchema);
