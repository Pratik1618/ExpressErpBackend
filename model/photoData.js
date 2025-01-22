const mongoose = require('mongoose');

// Define a schema for file metadata
const fileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
  contentType: { type: String, required: true },
  photoData: { type: String, required: true },
},{ timestamps: true  });

// Create a model based on the schema
const File = mongoose.model('File', fileSchema);

module.exports = File;