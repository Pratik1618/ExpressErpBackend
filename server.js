const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./model/db');
const SurveyData = require('./model/survey');
const elevatorRoutes = require('./routes/elevatorRoutes')
const app = express();
const deleteSurveyById = require('./deletecall/surveyDelete')
const getSurvey = require('./getcall/surveyGet')
const surveyRoutes = require('./routes/surveyRoutes');
const sumationData = require('./routes/SumationRoutes');
const cities = require('./masters/cityMaster')
const getCities = require('./getcall/cityGetMaster')
app.use(cors());
app.use(bodyParser.json());
connectDB();

app.use(getSurvey)
app.use(deleteSurveyById)
app.use(elevatorRoutes)
app.use(getCities)
// POST route to create survey data
app.use(cities);
app.use(sumationData);
app.use(surveyRoutes);
app.get('/', (req, res) => {
    res.send('Hello, World! This is the root URL.');
});

// Start the server
const port = 8085;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
