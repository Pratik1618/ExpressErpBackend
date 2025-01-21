const express =require('express');

const SumationData = require('../model/SumationData');
const SurveyData = require('../model/survey');
const ElevatorData = require('../model/elevatorData');

const router = express.Router();
router.post('/survey/create', async (req, res) => { 
    const newSumationData = new SumationData({
        Survey_Data:SurveyData,
        Elevator_Data:ElevatorData,
    });
    await newSumationData.save();
})



module.exports = router;