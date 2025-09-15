const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },

  vehicle: {
    model: String,
    plateNumber: String,
    color: String
  },

  availability: { type: Boolean, default: false },

  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], default: [0, 0] } 
  },

  ratings: {
    totalRatings: { type: Number, default: 0 },
    numberOfTrips: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 }
  },

  createdAt: { type: Date, default: Date.now }
});

driverSchema.index({ location: "2dsphere" });

driverSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("Driver", driverSchema);
