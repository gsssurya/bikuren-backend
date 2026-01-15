const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/emailMessage.util');

const signUp = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;
        var token = jwt.sign(
            req.body,
            process.env.JWT_SECRET,
            { expiresIn: 360 },
        );
        await sendEmail(req.body.email, token);
        res.status(200).json({ message: 'To verify, please check your email!' });
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const authVerify = async (req, res) => {
    try {
        const { token } = req.params;
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const { iat, exp, ...data } = decode;
        await User.create(data);
        res.status(200).json('Verification success!');
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
}

const signIn = async (req, res) => {
    try {
        const data = await User.findOne({ 
            where: {
                email: req.body.email,
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