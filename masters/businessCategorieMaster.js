const express = require('express');
const mongoose = require('mongoose');
const BusinessSchema = require('../model/BusinessData');
const router = express.Router();


  router.post('/create/category', async (req, res) => {
    const { business } = req.body;
  
    if (!business || business.length === 0) {
      return res.status(400).json({ message: "Cities array is required" });
    }
  
    try {
      // Insert each city as a separate document
      const businessDocuments = business.map(business => new BusinessSchema({ name: business }));
      await BusinessSchema.insertMany(businessDocuments); // Insert multiple cities
  
      res.status(201).json({ message: "Cities added successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });


  module.exports = router;