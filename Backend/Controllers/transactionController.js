const Transaction = require('../Models/transactions');
const Book = require('../Models/books');
const issueBook = async (req, res) => {
    try {
        const { bookId, memberId, issueDate, dueDate, remarks } = req.body;
        const book = await Book.findById(bookId);
        if (!book) {
            throw new Error('Book not found');
        }
        if (!book.available) {
            throw new Error('Book is already issued');
        }
        const transaction = await Transaction.create({
            book: bookId,
            member: memberId,
            issueDate,
            dueDate,
            remarks
        });
        await Book.findByIdAndUpdate(bookId, { available: false });
        res.status(201).json({
            status: 'success',
            data: transaction
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
const returnBook = async (req, res) => {
    try {
        const { transactionId, returnDate, remarks } = req.body;
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        transaction.returnDate = returnDate || Date.now();
        transaction.remarks = remarks;
        transaction.status = 'returned';
        await transaction.save();
        await Book.findByIdAndUpdate(transaction.book, { available: true });
        res.status(200).json({
            status: 'success',
            data: transaction
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('book member');
        res.status(200).json({
            status: 'success',
            results: transactions.length,
            data: transactions
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
module.exports = {
    issueBook,
    returnBook,
    getAllTransactions
};
