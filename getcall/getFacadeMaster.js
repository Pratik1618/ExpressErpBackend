const express = require('express');
const router = express.Router();

const FacadeSchema = require('../model/facadeData');

router.get('/facade/all', async (req, res) => {
    try {
      const facade = await FacadeSchema.find();  // Retrieves all survey data
      res.json(facade);
      console.log(facade)  // Send the surveys data as a JSON response
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  
});

module.exports = router;