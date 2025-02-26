const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const businessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  });

  const BusinessSchema = mongoose.model('Business', businessSchema);

  module.exports = BusinessSchema;