// models/elevatorData.js
const mongoose = require('mongoose');

const elevatorDataSchema = new mongoose.Schema({
  name: String,
  make: String,
  capacity: Number,
  yearInstalled: String,
  underAMC: String,
  amcType: String,
  amcRemarks: String,
  licenseExpiry: String
}, { timestamps: true });

const ElevatorData = mongoose.model('ElevatorData', elevatorDataSchema);

module.exports = ElevatorData;