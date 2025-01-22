const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const File = require('../model/photoData');  // Assuming you have a File model to store metadata

// MongoDB URI


// Set up multer for file storage (in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST route to handle file upload and convert image to Base64
router.post('/photo/create', upload.single('photo'), async (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Get file data from request
    const { originalname, mimetype, buffer } = req.file;

    // Convert the image buffer to Base64
    const base64Image = buffer.toString('base64');
    const base64Data = `data:${mimetype};base64,${base64Image}`; // Include MIME type in Base64 format

    // Store the Base64 image data in MongoDB
    const newFile = new File({
      filename: originalname,
      contentType: mimetype,
      photoData: base64Data,  // Store the Base64 string in the photoData field
    });

    // Save file metadata and Base64 image in MongoDB
    await newFile.save();

    res.status(200).send({
      message: 'File uploaded and converted to Base64 successfully',
      
        id: newFile._id,
        filename: newFile.filename,
        contentType: newFile.contentType,
      
    });
  } catch (err) {
    console.error('Error processing file upload:', err);
    res.status(500).send({ message: 'Error uploading file', error: err.message });
  }
});

module.exports = router;
