const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


  router.post('/api/cities', async (req, res) => {
    const { cities } = req.body;
  
    if (!cities || cities.length === 0) {
      return res.status(400).json({ message: "Cities array is required" });
    }
  
    try {
      // Insert each city as a separate document
      const cityDocuments = cities.map(city => new City({ name: city }));
      await City.insertMany(cityDocuments); // Insert multiple cities
  
      res.status(201).json({ message: "Cities added successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });


  module.exports = router;