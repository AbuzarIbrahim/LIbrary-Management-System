const User = require('../Models/users');
const jwt = require('jsonwebtoken');
const config = require('../config/index');
const generateToken = (userId, role) => {
    return jwt.sign({ id: userId, role }, config.jwt_secret, {
        expiresIn: config.jwt_expiration
    });
};
const SignUp = async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });
        const token = generateToken(newUser._id, newUser.role);
        newUser.password = undefined;
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: {
                  token,
                user: newUser,
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
const LogIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error('Please provide email and password');
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await user.checkPassword(password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        const token = generateToken(user._id, user.role);
        res.status(200).json({
            status: 'success',
            message: 'Logged in successfully',
            data: {
                token,
                user
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail to login',
            message: error.message
        });
    }
};
const ForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            throw new Error('Please provide your email');
        }
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Email not found');
        }
        const token = generateToken(user._id, user.role);
        res.status(200).json({
            status: 'success',
            data: {
                token,
                user
            },
            message: 'Password reset instructions sent'
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
const ChangePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;
        if (!email || !oldPassword || !newPassword) {
            throw new Error('Please provide email, old password and new password');
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await user.checkPassword(oldPassword);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        user.password = newPassword;
        await user.save();
        const token = generateToken(user._id, user.role);
        res.status(200).json({
            status: 'success',
            message: 'Password changed successfully',
            data: {
                token,
                user
            },
        }); 
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
const UpdatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('+password');
        user.password = req.body.newPassword;
        await user.save();
        res.status(200).json({
            status: 'success',
            message: 'Password updated successfully'
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
const GetAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({
            status: 'success',
            message: 'All users retrieved successfully',
            data: {
                users,
                count: users.length
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
const DeleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            throw new Error('User not found');
        }
        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully',
            data: null
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
module.exports = {
    SignUp,
    LogIn,
    ForgotPassword,
    UpdatePassword,
    ChangePassword,
    GetAllUsers,
    DeleteUser
};
