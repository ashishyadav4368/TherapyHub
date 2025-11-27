const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const sessionSchema = new mongoose.Schema({
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
    type: {
        type: String,
        enum: ['chat', 'audio', 'video'],
        required: true
    },
    date: {
        type: String,
        required: true
    },
    // time: {
    //     type: String,
    //     required: true
    // },
    notes: {
        type: String,
        trim: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    payment_status: {
        type: String,
        enum: ['pending', 'submitted', 'verified', 'rejected'],
        default: 'pending'
    },
    txn_id: {
        type: String,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    room_id: {
        type: String,
        default: () => uuidv4()
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Session', sessionSchema);