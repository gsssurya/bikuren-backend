const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/emailMessage.util');
const { v4: uuidv4 } = require('uuid');

const signUp = async (req, res) => {
    try {
        const { password, ...rest } = req.body
        const salt = bcrypt.genSaltSync(10);
        const verificationToken = uuidv4();
        const verificationTokenHash = bcrypt.hashSync(verificationToken, salt);
        const verificationTokenExpiry = new Date(
            Date.now() + (60 * 60 * 1000)
        );
        const passwordHash = bcrypt.hashSync(password, salt);
        const userPayload = {
            ...rest,
            password: passwordHash,
            verification_token: verificationTokenHash,
            verification_token_expiry: verificationTokenExpiry
        };
        const user = await User.create(userPayload);
        await sendEmail(userPayload.email, `http://localhost:3000/auth/${user.id}/${verificationToken}`);
        res.status(200).json({
            id: user.id,
            token: verificationToken,
            message: "To verify your account, please check your email, click the verification link, or manually use the ID and token at /auth/verify",
            verifivationLink: `http://localhost:3000/auth/${user.id}/${verificationToken}`
        });
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const authVerify = async (req, res) => {
    try {
        const { id, token } = req.params;
        const data = await User.findOne({
            where: { id,  },
            attributes: {
                include: [
                    'id',
                    'email', 
                    'verification_token', 
                    'verification_token_expiry'
                ]
            }
        });

        if(!data) return res.status(401).json({ 
            message: 'Invalid verification link!' 
        });

        if(data.is_verified) return res.status(400).json({ 
            message: 'Email already verified!' 
        });

        if(data.verification_token_expiry < new Date()) return res.status(401).json({ 
            message: 'Verification token has expired!' 
        });

        const isTokenValid = bcrypt.compareSync(token, data.verification_token);

        if(!isTokenValid) return res.status(401).json({ 
            message: 'Invalid verification token!' 
        });

        data.is_verified = true;
        data.verification_token = null;
        data.verification_token_expiry = null;

        await data.save();

        res.status(200).json({ message: 'Verification success!' });

    } catch (e) {
        res.status(500).json({ message: `${e}` });
    };
};

const signIn = async (req, res) => {
    try {
        const data = await User.findOne({ 
            where: {
                email: req.body.email,
                is_verified: true
            }}
        );
        if(!data) return res.status(404).json({ message: 'Your email is not registered yet!' })
        const comparePass = bcrypt.compareSync(req.body.password, data.password);
        if(comparePass) {
            var token = jwt.sign({
                id: data.id,
                role: data.role
            },
                process.env.JWT_SECRET
            );
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60,
                signed: true
            });
            res.status(200).json({ message: "Sign in success!" });
        } else {
            res.status(400).json({ message: "Incorrect password!" });
        }
    } catch (e) {
        res.status(500).json({message: `${e}`})
    }
};

const signOut = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Sign out success!" });
};


module.exports = { 
    signUp,
    signIn,
    signOut,
    authVerify
};