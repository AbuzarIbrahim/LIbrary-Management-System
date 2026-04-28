const express = require('express');
const transactionController = require('../Controllers/transactionController');
const { verifyToken, restrictTo } = require('../middleware/tokenAuth');
const router = express.Router();


router.get('/', verifyToken, transactionController.getAllTransactions);
router.post('/issue', verifyToken, restrictTo('admin'), transactionController.issueBook);
router.post('/return', verifyToken, restrictTo('admin'), transactionController.returnBook);
module.exports = router;
