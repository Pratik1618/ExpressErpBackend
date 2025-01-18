// routes/elevatorRoutes.js
const express = require('express');
const ElevatorData = require('../model/elevatorData');
const router = express.Router();


// Function to handle survey data processing
async function processElevatorData(incomingData) {
    // Check if surveyData is present and has content
    if (incomingData.allElevatorData && incomingData.allElevatorData.length > 0) {
        try {
            // Using async/await with a for loop to handle async correctly
            for (let elevator of incomingData.allElevatorData) {
                try {
                    // Create a new instance of the SurveyData model
                    const newELevatorData = new ElevatorData(survey);
                    console.log("Creating new SurveyData:", newELevatorData);

                    // Save the data to MongoDB
                    await newELevatorData.save();
                    console.log('Survey data saved successfully for client:', survey.clientName);
                } catch (error) {
                    console.error('Error saving survey data for client:', survey.clientName, error);
                }
            }
        } catch (error) {
            console.error('Error processing survey data:', error);
            throw new Error('Failed to process survey data');
        }
    } else {
        throw new Error('No survey data found');
    }
}

module.exports = {processElevatorData};
