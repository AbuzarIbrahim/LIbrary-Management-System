const config = require('../config/index');
const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token. Unauthorized.' });
  }
  try {
    const decoded = jwt.verify(token, config.jwt_secret);
    req.user = decoded;
    next(); 
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'fail',
                message: 'You do not have permission to perform this action'
            });
        }
        next();
    };
};
module.exports = { verifyToken, restrictTo };
