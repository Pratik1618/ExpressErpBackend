const express = require('express');

const router = express.Router();
const City = require('../model/cityData');

router.put('/city/delete/:id', async (req, res) => {
    try {
        const cityId = req.params.id;  // Get the survey ID from the request parameters
        
        // Find and delete the survey by its ID
       
        const deletedCity = await City.findByIdAndUpdate(
            cityId, 
            { isDeleted: 1 },  // Set the flag to 1 (hidden)
            { new: true }  // Return the updated document
        );
     
        // If no survey is found with that ID, return a 404 error
        if (!deletedCity) {
            return res.status(404).json({ message: 'cITY not found' });
        }

        // Successfully deleted, return the deleted survey details
        res.json({
            message: 'CITY deleted successfully',
            deletedCity,
        });
    } catch (err) {
        console.error('Error deleting survey:', err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;