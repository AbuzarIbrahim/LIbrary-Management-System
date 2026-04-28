const express = require('express');
const router = express.Router();
const { validateSignup, validateLogin } = require('../middleware/validation');
const { verifyToken, restrictTo } = require('../middleware/tokenAuth');
const { 
    SignUp,
    LogIn,
    GetAllUsers,
    DeleteUser,
    ForgotPassword,
    ChangePassword,
    UpdatePassword
} = require('../Controllers/userController');
router.post('/signup', validateSignup, SignUp);
router.post('/login', validateLogin, LogIn);
router.post('/forgot-password', ForgotPassword);
router.get('/users', verifyToken, restrictTo('admin'), GetAllUsers);
router.delete('/user/:id', verifyToken, restrictTo('admin'), DeleteUser);
router.post('/change-password', verifyToken, ChangePassword);
router.put('/update-password', verifyToken, UpdatePassword);
module.exports = router;
