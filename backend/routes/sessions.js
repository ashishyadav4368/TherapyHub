const express = require('express');
const Session = require('../models/Session');
const Payment = require('../models/Payment');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Book a session (clients only)
router.post('/', auth, authorize('client'), async (req, res) => {
    try {
        const { therapist_id, type, date, time, notes, amount, txn_id } = req.body;

        // Create session
        const session = new Session({
            client_id: req.user._id,
            therapist_id,
            type,
            date,
            time,
            notes,
            amount,
            txn_id,
            status: 'confirmed' // Auto-confirm for demo purposes
        });

        await session.save();

        // Create payment record
        if (txn_id && amount) {
            const payment = new Payment({
                session_id: session._id,
                client_id: req.user._id,
                amount,
                txn_id,
                verified: null // Admin needs to verify - pending status
            });

            await payment.save();

            // Don't mark session as paid until admin verifies
            session.paid = false;
            session.payment_status = 'submitted';
            await session.save();
        }

        res.json({ success: true, session });
    } catch (error) {
        console.error('Error booking session:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get client's sessions
router.get('/my-sessions', auth, authorize('client'), async (req, res) => {
    try {
        const sessions = await Session.find({ client_id: req.user._id })
            .populate('therapist_id', 'name specialization whatsapp')
            .sort({ date: -1, time: -1 });

        res.json(sessions);
    } catch (error) {
        console.error('Error fetching client sessions:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get therapist's sessions
router.get('/therapist-sessions', auth, authorize('therapist'), async (req, res) => {
    try {
        // For demo purposes, we'll return sessions for all therapists
        // In production, you'd link therapist users to therapist profiles
        const sessions = await Session.find()
            .populate('client_id', 'name email phone')
            .populate('therapist_id', 'name specialization')
            .sort({ date: -1, time: -1 });

        res.json(sessions);
    } catch (error) {
        console.error('Error fetching therapist sessions:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update session status
router.patch('/:id', auth, async (req, res) => {
    try {
        const { status } = req.body;
        const session = await Session.findById(req.params.id)
            .populate('client_id', 'name email')
            .populate('therapist_id', 'name specialization');

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        // Validate status
        const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        session.status = status;
        await session.save();

        res.json({
            success: true,
            message: `Session ${status} successfully`,
            session
        });
    } catch (error) {
        console.error('Error updating session:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;