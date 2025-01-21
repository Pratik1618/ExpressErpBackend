// db.js
const mongoose = require('mongoose');

// Function to connect to MongoDB Atlas
const connectDB = async () => {

    MONGO_URI = 'mongodb+srv://PRATIK:FG345@survey.wx5n9.mongodb.net/?retryWrites=true&w=majority&appName=Survey'
    console.log( MONGO_URI)
  try {
    
    // Load the MongoDB URI from environment variables
    const mongoURI = MONGO_URI;
   // Log the mongoURI to check if it's loaded correctly
   console.log('Mongo URI:', mongoURI);
    if (!mongoURI) {
        throw new Error('MONGO_URI is not defined in .env file');
      }
    // Connect to MongoDB Atlas
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Atlas connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err);
    process.exit(1);  // Exit the process with a failure code
  }
};

module.exports = connectDB;
