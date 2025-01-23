const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const facadeData = new mongoose.Schema({
    name: { type: String, required: true },
    isDeleted: { type: Number, default: 0 },
  });

  const FacadeSchema = mongoose.model('facade', facadeData);

  module.exports = FacadeSchema;