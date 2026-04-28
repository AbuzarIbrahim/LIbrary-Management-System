const express = require('express');
const memberController = require('../Controllers/memberController');
const { verifyToken, restrictTo } = require('../middleware/tokenAuth');
const router = express.Router();
router.get('/', verifyToken, memberController.getAllMembers);
router.post('/', verifyToken, restrictTo('admin'), memberController.addMember);
router.patch('/:id', verifyToken, restrictTo('admin'), memberController.updateMember);
module.exports = router;
