const express = require('express');
const FacadeSchema = require('../model/facadeData');

const router = express.Router();


  router.post('/facade/create', async (req, res) => {
    const { facade } = req.body;
  
    if (!facade || facade.length === 0) {
      return res.status(400).json({ message: "Cities array is required" });
    }
  
    try {
      // Insert each city as a separate document
      const facadeDocuments = facade.map(facade => new FacadeSchema({ name: facade }));
      await FacadeSchema.insertMany(facadeDocuments); // Insert multiple cities
  
      res.status(201).json({ message: "Cities added successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });


  module.exports = router;