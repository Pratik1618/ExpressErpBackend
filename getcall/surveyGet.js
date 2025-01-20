const express = require('express');
const SurveyData = require('../model/survey');
const router = express.Router();


router.get('/survey/all', async (req, res) => {
    try {
      const surveys = await SurveyData.find();  // Retrieves all survey data
      res.json(surveys);
      console.log(surveys)  // Send the surveys data as a JSON response
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  
});

module.exports = router;