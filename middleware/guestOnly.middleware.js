const guestOnly = (req, res, next) => {
    const token = req.signedCookies.token || req.cookies.token;
    if (token) {
        return res.status(400).json({
        message: 'You are already sign in. Please sign out first!'
        });
    }
    next();
};

module.exports = guestOnly;
