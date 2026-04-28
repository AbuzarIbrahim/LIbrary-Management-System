const express = require('express');
const bookController = require('../Controllers/bookController');
const { verifyToken, restrictTo } = require('../middleware/tokenAuth');
const router = express.Router();
router.get('/', bookController.getAllBooks);
router.post('/', verifyToken, restrictTo('admin'), bookController.addBook);
router.patch('/:id', verifyToken, restrictTo('admin'), bookController.updateBook);
module.exports = router;
