const mongoose = require('mongoose');
const SurveyData = require('./survey');
const ElevatorData = require('./elevatorData');

const sumationDataSchema = new mongoose.Schema({
    Survey_Data:{
        type: SurveyData.schema,
        required: true
    },
    Elevator_Data:{
        type: ElevatorData.schema,
        required: true
    }

});
const SumationData = mongoose.model('SumationData', sumationDataSchema);
module.exports = SumationData