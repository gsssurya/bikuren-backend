const User = require('../models/User');

const checkEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const userExist = await User.findOne({ 
            where: {
                email,
            }
        });
        if(userExist) return res.status(409).json({ message:'Your email is already registered!' });
        next();
    } catch (e) {
        next(e);
    }
};

module.exports = checkEmail;