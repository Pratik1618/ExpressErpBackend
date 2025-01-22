const mongoose = require('mongoose');

// Define the store room schema
const storeRoomSchema = new mongoose.Schema({
    name: String,
    carpetArea: Number,
    facilitiesProvided: {
        teaCoffeeMachine: { type: Boolean, default: false },
        teaCoffeeServices: { type: Boolean, default: false },
        packageDrinkingWater: { type: Boolean, default: false },
        normalWater: { type: Boolean, default: false },
    },
    crockery: {
        washables: { type: Boolean, default: false },
        disposables: { type: Boolean, default: false },
    },
    AC: String,
    furniture: String,
    remarks: String,
    photoId: Number,
    addPhoto: String,
}, { timestamps: true });

// Create the model for StoreRoom
const StoreRoomSchema = mongoose.model('StoreRoom', storeRoomSchema);

module.exports = StoreRoomSchema;