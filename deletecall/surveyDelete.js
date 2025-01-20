const express = require('express');
const SurveyData = require('../model/survey');
const router = express.Router();


router.put('/survey/delete/:id', async (req, res) => {
    try {
        const surveyId = req.params.id;  // Get the survey ID from the request parameters
        
        // Find and delete the survey by its ID
       
        const deletedSurvey = await SurveyData.findByIdAndUpdate(
            surveyId, 
            { isDeleted: 1 },  // Set the flag to 1 (hidden)
            { new: true }  // Return the updated document
        );
     
        // If no survey is found with that ID, return a 404 error
        if (!deletedSurvey) {
            return res.status(404).json({ message: 'Survey not found' });
        }

        // Successfully deleted, return the deleted survey details
        res.json({
            message: 'Survey deleted successfully',
            deletedSurvey,
        });
    } catch (err) {
        console.error('Error deleting survey:', err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;