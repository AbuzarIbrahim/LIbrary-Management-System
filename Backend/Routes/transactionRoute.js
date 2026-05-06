const express = require('express');
const transactionController = require('../Controllers/transactionController');
const { verifyToken, restrictTo } = require('../middleware/tokenAuth');
const router = express.Router();


router.get('/', verifyToken, transactionController.getAllTransactions);
router.post('/issue', verifyToken, transactionController.issueBook);
router.post('/return', verifyToken, transactionController.returnBook);
module.exports = router;
