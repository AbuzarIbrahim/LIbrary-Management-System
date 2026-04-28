const Book = require('../Models/books');
const addBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({
            status: 'success',
            data: book
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({
            status: 'success',
            results: books.length,
            data: books
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: book
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
module.exports = {
    addBook,
    getAllBooks,
    updateBook
};
