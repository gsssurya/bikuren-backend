const authorize = (allowedRole) => {
    return (req, res, next) => {
        if (!allowedRole.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden. Access denied!' });
        }
        next();
    };
};

module.exports = authorize;
