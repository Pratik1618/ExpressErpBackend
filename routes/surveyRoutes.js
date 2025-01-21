// routes/surveyRoutes.js
const express = require('express');
const SurveyData = require('../model/survey');
const router = express.Router();


router.post('/survey/create', async (req, res) => {
  const incomingData = req.body;
  console.log('Received data:', incomingData);

  if (incomingData.surveyData && incomingData.surveyData.length > 0) {
    try {
      for (let survey of incomingData.surveyData) {
        try {
          const newSurveyData = new SurveyData(survey);
          await newSurveyData.save();
          console.log('Survey data saved successfully for client:', survey.clientName);
        } catch (error) {
          console.error('Error saving survey data:', error);
        }
      }
      res.json({
        status: 'success',
        message: 'Survey data received and saved successfully',
        receivedData: incomingData
      });
    } catch (error) {
      console.error('Error processing survey data:', error);
      return res.status(500).json({ message: 'Failed to process survey data' });
    }
  } else {
    return res.status(400).json({ message: 'No survey data provided' });
  }
});

module.exports = router;
