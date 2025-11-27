const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    session_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    txn_id: {
        type: String,
        required: true,
        trim: true
    },
    verified: {
        type: Boolean,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Payment', paymentSchema);