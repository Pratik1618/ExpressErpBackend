// routes/elevatorRoutes.js
const express = require('express');
const StoreRoomSchema = require('../model/storeFormData');
const router = express.Router();

router.post('/survey/create', async (req, res) => {

    const incomingData = req.body;
    if (incomingData.mergedStoreRoomData && incomingData.mergedStoreRoomData.length > 0) {
        try {
            // Using async/await with a for loop to handle async correctly
            for (let storeRoom of incomingData.mergedStoreRoomData) {
                try {
                    // Create a new instance of the SurveyData model
                    const newStoreRoomData = new StoreRoomSchema(storeRoom);
                    console.log("Creating new storerom:", newStoreRoomData);

                    // Save the data to MongoDB 
                    await newStoreRoomData.save();
                    console.log('Survey data saved successfully for client:',);
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