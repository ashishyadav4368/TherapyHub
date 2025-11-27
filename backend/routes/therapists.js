const express = require('express');
const Therapist = require('../models/Therapist');

const router = express.Router();

// Get all active therapists
router.get('/', async (req, res) => {
    try {
        const therapists = await Therapist.find({ status: 'active' });
        res.json(therapists);
    } catch (error) {
        console.error('Error fetching therapists:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get therapist by ID
router.get('/:id', async (req, res) => {
    try {
        const therapist = await Therapist.findById(req.params.id);
        if (!therapist) {
            return res.status(404).json({ message: 'Therapist not found' });
        }
        res.json(therapist);
    } catch (error) {
        console.error('Error fetching therapist:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;