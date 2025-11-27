const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    therapist_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Therapist',
        required: true
    },
    session_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    review: {
        type: String,
        trim: true,
        maxlength: 500
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Ensure one rating per client per session
ratingSchema.index({ client_id: 1, session_id: 1 }, { unique: true });

// Update the updatedAt field before saving
ratingSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Rating', ratingSchema);