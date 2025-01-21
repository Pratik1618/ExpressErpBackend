const express = require('express');
const router = express.Router();
const BusinessSchema = require('../model/BusinessData');

router.get('/category', async (req, res) => {
    try {
      const business = await BusinessSchema.find();  // Retrieves all survey data
      res.json(business);
      console.log(business)  // Send the surveys data as a JSON response
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  
});

module.exports = router;