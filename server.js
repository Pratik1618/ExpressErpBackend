const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./model/db');
const SurveyData = require('./model/survey');
const elevatorRoutes = require('./routes/elevatorRoutes')
const app = express();
const deleteSurveyById = require('./deletecall/surveyDelete')
const getSurvey = require('./getcall/surveyGet')

app.use(cors());
app.use(bodyParser.json());
connectDB();

app.use(getSurvey)
app.use(deleteSurveyById)

// POST route to create survey data
app.post('/survey/create', async (req, res) => {
    const incomingData = req.body;
    console.log('Received data:', incomingData);

    // Check if surveyData is present and has content
    console.log("surveyData array length:", incomingData.surveyData.length);
    
    if (incomingData.surveyData && incomingData.surveyData.length > 0) {
        try {
            // Using async/await with a for loop to handle async correctly
            for (let survey of incomingData.surveyData) {
                try {
                    // Create a new instance of the SurveyData model
                    const newSurveyData = new SurveyData(survey);
                    console.log("Creating new SurveyData:", newSurveyData);
                    
                    // Save the data to MongoDB
                    await newSurveyData.save();
                    console.log('Survey data saved successfully for client:', survey.clientName);
                } catch (error) {
                    console.error('Error saving survey data for client:', survey.clientName, error);
                }
            }

        } catch (error) {
            console.error('Error processing survey data:', error);
            return res.status(500).json({ message: 'Failed to process survey data' });
        }
    } else {
        console.log('No survey data found.');
        return res.status(400).json({ message: 'No survey data found' });
    }

    await elevatorRoutes.processElevatorData(incomingData)
    // If there is escalator data, print the capacity for each entry
    if (incomingData.allEscalatorData && incomingData.allEscalatorData.length > 0) {
        incomingData.allEscalatorData.forEach(elevator => {
            console.log('Escalator capacity:', elevator.capacity);
        });
    }

    res.json({
        status: 'success',
        message: "Data received successfully",
        receivedData: incomingData
    });
});

app.get('/', (req, res) => {
    res.send('Hello, World! This is the root URL.');
});

// Start the server
const port = 8085;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
