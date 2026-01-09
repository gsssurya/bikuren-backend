const User = require('../models/User');

const checkEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const userExist = await User.findOne({ 
            where: {
                email,
            }
        });
        if(userExist) return res.status(409).json({ message:'You are already sign up!' });
        next();
    } catch (e) {
        next(e);
    }
};

module.exports = checkEmail;