// routes/elevatorRoutes.js
const express = require('express');
const ElevatorData = require('../model/elevatorData');
const router = express.Router();

router.post('/survey/create', async (req, res) => {

    const incomingData = req.body;
    if (incomingData.allElevatorData && incomingData.allElevatorData
        .length > 0) {
        try {
          for (let elevator of incomingData.allElevatorData
          ) {
            try {
              const newElevatorData = new ElevatorData(elevator);
              await newElevatorData.save();
              console.log('Survey data saved successfully for client:', elevator.capacity);
            } catch (error) {
              console.error('Error saving survey data:', error);
            }
          }
          res.json({
            status: 'success',
            message: 'newElevatorData data received and saved successfully',
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
// Function to handle survey data processing


module.exports = router;