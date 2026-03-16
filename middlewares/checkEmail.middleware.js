const User = require('../models/User');
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/emailMessage.util');
const { v4: uuidv4 } = require('uuid');

const checkEmail = async (req, res, next) => {
    try {
        const { email, ...rest } = req.body;
        const user = await User.findOne({ 
            where: {
                email
            }
        });

        if(!user) return next();

        if(user.is_verified) return res.status(409).json({ // Menggunakan 409 (Conflict) atau 401 sesuai selera
            success: false,
            error: {
                type: "VALIDATION_ERROR",
                details: [{
                    field: 'email',
                    message: 'Your email is already registered'
                }]
            }
        });

        const salt = bcrypt.genSaltSync(10);
        const verificationToken = uuidv4();
        const verificationTokenHash = bcrypt.hashSync(verificationToken, salt);
        const verificationTokenExpiry = new Date(
            Date.now() + (60 * 60 * 1000)
        );

        let passwordHash = '';
        if(rest.password){
            passwordHash = bcrypt.hashSync(rest.password, salt);
        }

        rest.password = passwordHash;
        user.verification_token = verificationTokenHash;
        user.verification_token_expiry = verificationTokenExpiry;

        await user.save();

        await User.update(rest, {
            where: {
                id: user.id
            }
        })

        await sendEmail(user.email, `http://192.168.110.15:5173/verify/${user.id}/${verificationToken}`, user.name);

        return res.status(200).json({
            id: user.id,
            token: verificationToken,
            message: "To verify your account, please check your email, click the verification link, or manually use the ID and token at /auth/verify",
            verifivationLink: `http://192.168.110.15:5173/verify/${user.id}/${verificationToken}`
        });

    } catch (e) {
        next(e);
    }
};

module.exports = checkEmail;