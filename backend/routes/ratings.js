const express = require('express');
const Rating = require('../models/Rating');
const Session = require('../models/Session');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Submit a rating (clients only)
router.post('/', auth, authorize('client'), async (req, res) => {
    try {
        const { therapist_id, session_id, rating, review } = req.body;

        // Verify session exists and belongs to client
        const session = await Session.findOne({
            _id: session_id,
            client_id: req.user._id,
            status: 'completed'
        });

        if (!session) {
            return res.status(400).json({
                message: 'Session not found or not completed'
            });
        }

        // Check if rating already exists
        const existingRating = await Rating.findOne({
            client_id: req.user._id,
            session_id
        });

        if (existingRating) {
            // Update existing rating
            existingRating.rating = rating;
            existingRating.review = review;
            await existingRating.save();

            return res.json({
                success: true,
                message: 'Rating updated successfully',
                rating: existingRating
            });
        }

        // Create new rating
        const newRating = new Rating({
            client_id: req.user._id,
            therapist_id,
            session_id,
            rating,
            review
        });

        await newRating.save();

        res.status(201).json({
            success: true,
            message: 'Rating submitted successfully',
            rating: newRating
        });
    } catch (error) {
        console.error('Error submitting rating:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get therapist ratings
router.get('/therapist/:therapistId', async (req, res) => {
    try {
        const ratings = await Rating.find({
            therapist_id: req.params.therapistId
        })
            .populate('client_id', 'name')
            .populate('session_id', 'date type')
            .sort({ createdAt: -1 });

        // Calculate average rating
        const avgRating = ratings.length > 0
            ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
            : 0;

        res.json({
            ratings,
            averageRating: Math.round(avgRating * 10) / 10,
            totalRatings: ratings.length
        });
    } catch (error) {
        console.error('Error fetching ratings:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get client's ratings
router.get('/my-ratings', auth, authorize('client'), async (req, res) => {
    try {
        const ratings = await Rating.find({ client_id: req.user._id })
            .populate('therapist_id', 'name specialization')
            .populate('session_id', 'date type')
            .sort({ createdAt: -1 });

        res.json(ratings);
    } catch (error) {
        console.error('Error fetching client ratings:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;