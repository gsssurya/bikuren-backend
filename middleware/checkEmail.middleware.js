const User = require('../models/User');
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/emailMessage.util');
const { v4: uuidv4 } = require('uuid');

const checkEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ 
            where: {
                email
            }
        });

        if(!user) return next();

        if(user.is_verified) return res.status(409).json({ message:'Your email is already registered!' });

        const salt = bcrypt.genSaltSync(10);
        const verificationToken = uuidv4();
        const verificationTokenHash = bcrypt.hashSync(verificationToken, salt);
        const verificationTokenExpiry = new Date(
            Date.now() + (60 * 60 * 1000)
        );

        user.verification_token = verificationTokenHash;
        user.verification_token_expiry = verificationTokenExpiry;

        await user.save();

        await sendEmail(user.email, `http://localhost:3000/auth/${user.id}/${verificationToken}`);

        res.status(200).json({
            message: 'To verify, please check your email!', 
            verifivationLink: `http://localhost:3000/auth/${user.id}/${verificationToken}`
        });

    } catch (e) {
        next(e);
    }
};

module.exports = checkEmail;