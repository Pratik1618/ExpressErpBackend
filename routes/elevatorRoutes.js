// routes/elevatorRoutes.js
const express = require('express');
const ElevatorData = require('../model/elevatorData');
const router = express.Router();

router.post('/survey/create', async (req, res) => {

    const incomingData = req.body;
    if (incomingData.allElevatorData && incomingData.allElevatorData.length > 0) {
        try {
            // Using async/await with a for loop to handle async correctly
            for (let elevator of incomingData.allElevatorData) {
                try {
                    // Create a new instance of the SurveyData model
                    const newELevatorData = new ElevatorData(elevator);
                    console.log("Creating new SurveyData:", newELevatorData);

                    // Save the data to MongoDB
                    await newELevatorData.save();
                    console.log('Survey data saved successfully for client:', elevator.capacity);
                } catch (error) {
                    console.error('Error saving survey data for client:',  error);
                }
            }
        } catch (error) {
            console.error('Error processing survey data:', error);
            throw new Error('Failed to process survey data');
        }
    } else {
        throw new Error('No survey data found');
    }
});
// Function to handle survey data processing


module.exports = router;