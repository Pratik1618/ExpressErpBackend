const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./model/db');


const elevatorRoutes = require('./routes/elevatorRoutes')
const app = express();
const deleteSurveyById = require('./deletecall/surveyDelete')
const getSurvey = require('./getcall/surveyGet')

const sumationData = require('./routes/SumationRoutes');
const cities = require('./masters/cityMaster')
const getCities = require('./getcall/cityGetMaster')
const business = require('./masters/businessCategorieMaster')
const StoreData = require('./routes/storeRoomRoute')
const getBusinessCategory = require('./getcall/getBusinessCategoryMaster')
const addphoto = require('./routes/addphotoRoute')
const deleteBusinessCategory = require('./deletecall/businessCategoryDelete')
const facade = require('./masters/facadeMaster')
const getFacades = require('./getcall/getFacadeMaster')
const deleteCity = require('./deletecall/deleteCity')
const createSurvey = require('./routes/surveyRoutes')
app.use(cors());
app.use(bodyParser.json());
connectDB();

app.use(createSurvey)
app.use(getSurvey)
app.use(deleteSurveyById)
app.use(elevatorRoutes)
app.use(getCities)
app.use(deleteCity)

// express app backend deployed on render successfully : https://expresserpbackend.onrender.com/
// POST route to create survey data
app.use(cities);
app.use(getBusinessCategory)
app.use(business);
app.use(sumationData);

app.use(addphoto)
app.use(StoreData),
app.use(deleteBusinessCategory)
app.use(facade)
app.use(getFacades)
app.get('/', (req, res) => {
    res.send('Hello, World! This is the root URL.');
});

// Start the server
const port = 8085;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
