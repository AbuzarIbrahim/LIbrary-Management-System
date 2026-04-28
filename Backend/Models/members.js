const mongoose = require('mongoose');
const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Member name is required'],
        trim: true
    },
    membershipNumber: {
        type: String,
        required: [true, 'Membership number is required'],
        unique: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: String,
        enum: ['6 months', '1 year', '2 years'],
        default: '6 months'
    },
    expiryDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'cancelled'],
        default: 'active'
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Member', memberSchema);
