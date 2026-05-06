const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const userRouter = require('./Routes/userRoute');
const bookRouter = require('./Routes/bookRoute');
const memberRouter = require('./Routes/memberRoute');
const transactionRouter = require('./Routes/transactionRoute');
const app = express();
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.url} ${res.statusCode} - ${duration}ms - User: ${req.user?.role || 'Guest'}`);
    });
    next();
});
app.use(helmet());
app.use(cors()); 
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 1000, 
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/members', memberRouter);
app.use('/api/v1/transactions', transactionRouter);
module.exports = app;
