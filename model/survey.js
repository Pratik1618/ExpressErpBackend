const mongoose = require('mongoose')
const Schema = mongoose.Schema

const surveyDataSchema = new mongoose.Schema({

    clientName: { type: String, required: true },
    siteName: String,
    businessCategory: String,
    city: String,
    state: String,
    zip: String,
    siteInchargeName: String,
    siteInchargeEmail: String,
    siteInchargePhone: String,
    commercialInchargeName: String,
    commercialInchargeEmail: String,
    commercialInchargePhone: String,
    locationInchargeName: String,
    locationInchargeEmail: String,
    locationInchargePhone: String,
    referralInchargeName: String,
    referralInchargeEmail: String,
    referralInchargePhone: String,
    sentProposalTo: [Schema.Types.Mixed],  // Assuming this is an object
    servicesRequired: [Schema.Types.Mixed], // Assuming this is an object
    additionalServices: [Schema.Types.Mixed], // Assuming this is an object
    premisesType: String,
    premises: { type: Number, required: true },
    isDeleted: { type: Number, default: 0 },

}, { timestamps: true  })

const SurveyData = mongoose.model('SurveyData', surveyDataSchema);

module.exports = SurveyData;