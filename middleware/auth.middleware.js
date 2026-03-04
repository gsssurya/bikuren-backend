const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.signedCookies.token || req.cookies.token;
    if (!token) return res.status(403).json({ message: 'You are not sign in yet!' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60,
        signed: true
    });

    next();
};

module.exports = auth;