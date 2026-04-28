const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Book title is required'],
        trim: true
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true
    },
    type: {
        type: String,
        enum: ['book', 'movie'],
        default: 'book'
    },
    serialNumber: {
        type: String,
        required: [true, 'Serial number is required'],
        unique: true
    },
    available: {
        type: Boolean,
        default: true
    },
    addedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Book', bookSchema);
