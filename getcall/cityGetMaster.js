const express = require('express');
const router = express.Router();
const CitySchema = require('../model/cityData');

router.get('/cities/all', async (req, res) => {
    try {
      const cities = await CitySchema.find({isDeleted:{$ne:true}});  // Retrieves all survey data
      res.json(cities);
      console.log(cities)  // Send the surveys data as a JSON response
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  
});

module.exports = router;