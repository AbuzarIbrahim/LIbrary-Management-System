const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
        required: true
    },
    member: {
        type: mongoose.Schema.ObjectId,
        ref: 'Member',
        required: true
    },
    issueDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date
    },
    finePaid: {
        type: Boolean,
        default: false
    },
    remarks: {
        type: String
    },
    status: {
        type: String,
        enum: ['issued', 'returned'],
        default: 'issued'
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Transaction', transactionSchema);
