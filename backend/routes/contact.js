const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const contact = new Contact({
            name,
            email,
            message
        });

        await contact.save();

        res.json({
            success: true,
            message: 'Thank you for your message. We will get back to you soon!'
        });
    } catch (error) {
        console.error('Error saving contact form:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;