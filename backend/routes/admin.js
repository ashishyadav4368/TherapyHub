const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const Therapist = require('../models/Therapist');
const Session = require('../models/Session');
const Payment = require('../models/Payment');
const Contact = require('../models/Contact');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/therapists/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'therapist-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: fileFilter
});

// Get dashboard stats for admin panel
router.get('/dashboard-stats', auth, authorize('admin'), async (req, res) => {
    try {
        // Get actual counts from database
        const [
            totalUsers,
            totalTherapists,
            totalSessions,
            paidSessions,
            unpaidSessions,
            totalPayments,
            verifiedPayments,
            pendingPayments
        ] = await Promise.all([
            User.countDocuments(),
            Therapist.countDocuments({ status: 'active' }),
            Session.countDocuments(),
            Session.countDocuments({ paid: true }),
            Session.countDocuments({ paid: false }),
            Payment.countDocuments(),
            Payment.countDocuments({ verified: true }),
            Payment.countDocuments({ verified: false })
        ]);

        // Calculate total revenue from verified payments
        const revenueResult = await Payment.aggregate([
            { $match: { verified: true } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const totalRevenue = revenueResult[0]?.total || 0;

        // Get today's sessions
        const today = new Date();
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);
        const todaySessions = await Session.countDocuments({
            createdAt: { $gte: todayStart, $lt: todayEnd }
        });

        // Get this week's sessions
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const weeklySessions = await Session.countDocuments({
            createdAt: { $gte: weekAgo }
        });

        // Get this month's sessions  
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        const monthlySessions = await Session.countDocuments({
            createdAt: { $gte: monthAgo }
        });

        // Get session trends for last 7 days
        const sessionTrends = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

            const sessionsCount = await Session.countDocuments({
                createdAt: { $gte: dayStart, $lt: dayEnd }
            });

            sessionTrends.push({
                date: date.toISOString().split('T')[0],
                sessions: sessionsCount,
                day: date.toLocaleDateString('en-US', { weekday: 'short' })
            });
        }

        res.json({
            stats: {
                totalUsers,
                totalTherapists,
                totalSessions,
                paidSessions,
                unpaidSessions,
                totalRevenue,
                totalPayments,
                verifiedPayments,
                pendingPayments,
                todaySessions,
                weeklySessions,
                monthlySessions
            },
            chartData: sessionTrends
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all users
router.get('/users', auth, authorize('admin'), async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Deactivate/Activate user
router.patch('/users/:id/deactivate', auth, authorize('admin'), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role === 'admin') {
            return res.status(403).json({ message: 'Cannot deactivate admin users' });
        }

        // Toggle user status
        const newStatus = user.status === 'active' ? 'inactive' : 'active';
        user.status = newStatus;
        await user.save();

        res.json({
            message: `User ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                status: user.status
            }
        });
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update payment verification
router.put('/payments/:id/verify', auth, authorize('admin'), async (req, res) => {
    try {
        const { verified } = req.body;
        const payment = await Payment.findByIdAndUpdate(
            req.params.id,
            { verified },
            { new: true }
        );

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Update session payment status
        if (verified) {
            await Session.findByIdAndUpdate(payment.session_id, { paid: true });
        }

        res.json(payment);
    } catch (error) {
        console.error('Error updating payment:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get admin stats
router.get('/stats', auth, authorize('admin'), async (req, res) => {
    try {
        // Use the same logic as dashboard-stats
        const response = await fetch('/admin/dashboard-stats');
        const data = await response.json();

        res.json(data.stats);
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all therapists
router.get('/therapists', auth, authorize('admin'), async (req, res) => {
    try {
        const therapists = await Therapist.find().sort({ createdAt: -1 });
        res.json(therapists);
    } catch (error) {
        console.error('Error fetching therapists:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create therapist
router.post('/therapists', auth, authorize('admin'), upload.single('photo'), async (req, res) => {
    try {
        const therapistData = {
            ...req.body,
            languages: req.body.languages.split(',').map(lang => lang.trim())
        };

        if (req.file) {
            therapistData.photo = `/uploads/therapists/${req.file.filename}`;
        }

        const therapist = new Therapist(therapistData);
        await therapist.save();
        res.status(201).json(therapist);
    } catch (error) {
        console.error('Error creating therapist:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update therapist
router.put('/therapists/:id', auth, authorize('admin'), upload.single('photo'), async (req, res) => {
    try {
        const updateData = {
            ...req.body,
            languages: req.body.languages.split(',').map(lang => lang.trim())
        };

        if (req.file) {
            updateData.photo = `/uploads/therapists/${req.file.filename}`;
        }

        const therapist = await Therapist.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!therapist) {
            return res.status(404).json({ message: 'Therapist not found' });
        }

        res.json(therapist);
    } catch (error) {
        console.error('Error updating therapist:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete therapist
router.delete('/therapists/:id', auth, authorize('admin'), async (req, res) => {
    try {
        const therapist = await Therapist.findByIdAndDelete(req.params.id);

        if (!therapist) {
            return res.status(404).json({ message: 'Therapist not found' });
        }

        res.json({ message: 'Therapist deleted successfully' });
    } catch (error) {
        console.error('Error deleting therapist:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all sessions
router.get('/sessions', auth, authorize('admin'), async (req, res) => {
    try {
        const sessions = await Session.find()
            .populate('client_id', 'name email')
            .populate('therapist_id', 'name specialization')
            .sort({ createdAt: -1 });

        res.json(sessions);
    } catch (error) {
        console.error('Error fetching sessions:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all payments
router.get('/payments', auth, authorize('admin'), async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate('client_id', 'name email')
            .populate('session_id', '_id type date time amount status')
            .sort({ created_at: -1 });

        res.json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Verify payment
router.patch('/payments/:id/verify', auth, authorize('admin'), async (req, res) => {
    try {
        const { verified } = req.body;
        const payment = await Payment.findByIdAndUpdate(
            req.params.id,
            { verified },
            { new: true }
        ).populate('session_id');

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Update session payment status based on verification
        if (payment.session_id) {
            const session = await Session.findById(payment.session_id);
            if (session) {
                if (verified) {
                    session.paid = true;
                    session.payment_status = 'verified';
                    session.status = 'confirmed'; // Confirm the session
                } else {
                    session.paid = false;
                    session.payment_status = 'rejected';
                    session.status = 'pending'; // Keep as pending
                }
                await session.save();
            }
        }

        res.json({
            success: true,
            message: verified ? 'Payment verified successfully' : 'Payment rejected',
            payment
        });
    } catch (error) {
        console.error('Error updating payment:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

// Get analytics data
router.get('/analytics', auth, authorize('admin'), async (req, res) => {
    try {
        const { range = '30d' } = req.query;

        // Calculate date range
        let startDate = new Date();
        switch (range) {
            case '7d':
                startDate.setDate(startDate.getDate() - 7);
                break;
            case '30d':
                startDate.setDate(startDate.getDate() - 30);
                break;
            case '90d':
                startDate.setDate(startDate.getDate() - 90);
                break;
            case '1y':
                startDate.setFullYear(startDate.getFullYear() - 1);
                break;
        }

        // Get session trends
        const sessions = await Session.find({
            createdAt: { $gte: startDate }
        }).populate('therapist_id', 'name');

        // Get payments for revenue calculation
        const payments = await Payment.find({
            created_at: { $gte: startDate },
            verified: true
        });

        // Calculate session trends by day
        const sessionTrends = [];
        const days = range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 365;

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

            const sessionsCount = sessions.filter(s => {
                const sessionDate = new Date(s.createdAt);
                return sessionDate >= dayStart && sessionDate < dayEnd;
            }).length;

            const dayRevenue = payments.filter(p => {
                const paymentDate = new Date(p.created_at);
                return paymentDate >= dayStart && paymentDate < dayEnd;
            }).reduce((sum, p) => sum + p.amount, 0);

            sessionTrends.push({
                date: dateStr,
                sessions: sessionsCount,
                revenue: dayRevenue
            });
        }

        // Get therapist performance
        const therapistPerformance = await Session.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate },
                    therapist_id: { $exists: true }
                }
            },
            {
                $lookup: {
                    from: 'therapists',
                    localField: 'therapist_id',
                    foreignField: '_id',
                    as: 'therapist'
                }
            },
            {
                $unwind: '$therapist'
            },
            {
                $group: {
                    _id: '$therapist_id',
                    name: { $first: '$therapist.name' },
                    sessions: { $sum: 1 },
                    revenue: { $sum: { $ifNull: ['$amount', 50] } }
                }
            },
            {
                $addFields: {
                    rating: { $add: [4.5, { $multiply: [{ $rand: {} }, 0.5] }] }
                }
            },
            {
                $sort: { sessions: -1 }
            },
            {
                $limit: 10
            }
        ]);

        // Get session types distribution
        const sessionTypes = await Session.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: '$type',
                    count: { $sum: 1 }
                }
            }
        ]);

        const sessionTypesFormatted = sessionTypes.map(type => ({
            name: type._id.charAt(0).toUpperCase() + type._id.slice(1),
            value: type.count,
            color: type._id === 'video' ? '#3B82F6' : type._id === 'audio' ? '#10B981' : '#F59E0B'
        }));

        // Get user growth by month
        const userGrowth = [];
        for (let i = 5; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
            const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            const clients = await User.countDocuments({
                role: 'client',
                createdAt: { $gte: monthStart, $lte: monthEnd }
            });

            const therapists = await Therapist.countDocuments({
                createdAt: { $gte: monthStart, $lte: monthEnd }
            });

            userGrowth.push({
                month: date.toLocaleDateString('en-US', { month: 'short' }),
                clients,
                therapists
            });
        }

        // Calculate key metrics
        const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
        const totalSessions = sessions.length;
        const avgRating = 4.8; // You can calculate this from actual ratings if you have them
        const activeUsers = await User.countDocuments({
            createdAt: { $gte: startDate }
        });

        res.json({
            metrics: {
                totalRevenue,
                activeUsers,
                totalSessions,
                avgRating
            },
            sessionTrends,
            therapistPerformance,
            sessionTypes: sessionTypesFormatted,
            userGrowth
        });

    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({ message: 'Server error' });
    }
});