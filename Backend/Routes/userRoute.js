const express = require('express');
const router = express.Router();
const { validateSignup, validateLogin } = require('../middleware/validation');
const { verifyToken, restrictTo } = require('../middleware/tokenAuth');
const { 
    SignUp,
    LogIn,
    GetAllUsers,
    DeleteUser,
    UpdateUser,
    ForgotPassword,
    ChangePassword,
    UpdatePassword
} = require('../Controllers/userController');

router.post('/signup', validateSignup, SignUp);
router.post('/login', validateLogin, LogIn);
router.post('/forgot-password', ForgotPassword);

router.get('/', verifyToken, restrictTo('admin'), GetAllUsers);
router.delete('/:id', verifyToken, restrictTo('admin'), DeleteUser);
router.patch('/:id', verifyToken, restrictTo('admin'), UpdateUser);

router.post('/change-password', verifyToken, ChangePassword);
router.put('/update-password', verifyToken, UpdatePassword);

module.exports = router;
