const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/decode-token', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    try {
        // Verify the token (this checks the signature and expiration)
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key

        // If the token is valid, send the decoded payload
        res.status(200).json({ message: 'Token is valid', payload: decoded });

    } catch (error) {
        console.error(error);
        // If token is invalid or expired
        res.status(401).json({ message: 'Invalid or expired token' });
    }
});

module.exports = router;