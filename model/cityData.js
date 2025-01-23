const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const citySchema = new mongoose.Schema({
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  });

  const CitySchema = mongoose.model('City', citySchema);

  module.exports = CitySchema;