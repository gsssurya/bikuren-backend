const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/emailMessage.util');
const { v4: uuidv4 } = require('uuid');

const signUp = async (req, res) => {
    try {
        const { email, password, ...rest } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const verificationToken = uuidv4();
        const passwordHash = bcrypt.hashSync(password, salt);
        
        const userPayload = {
            ...rest,
            email,
            password: passwordHash,
            verification_token: bcrypt.hashSync(verificationToken, salt),
            verification_token_expiry: new Date(Date.now() + (60 * 60 * 1000 * 24))
        };

        const user = await User.create(userPayload);
        
        // Kirim Email
        await sendEmail(email, `http://192.168.1.15:5173/verify/${user.id}/${verificationToken}`, userPayload.name);

        res.status(200).json({
            success: true,
            id: user.id,
            message: "Check your email for verification link."
        });

    } catch (e) {
        
        res.status(500).json({ 
            success: false, 
            error: { type: "SERVER_ERROR", details: [{ field: 'server', message: e}] } 
        });
    }
};

const checkVerify = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User tidak ditemukan"
      });
    }

    if (user.is_verified) {
      return res.status(200).json({
        status: "success",
        verified: true,
        message: "User sudah terverifikasi"
      });
    }

    return res.status(200).json({
      status: "success",
      verified: false,
      message: "User belum verifikasi email"
    });

  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Server error!"
    });
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
            message: 'Invalid verification link!',
            status: 'invalid-token'
        });

        if(data.is_verified) return res.status(400).json({ 
            message: 'Email already verified!',
            status: 'already'
        });

        if(data.verification_token_expiry < new Date()) return res.status(401).json({ 
            message: 'Verification token has expired!',
            status: 'expired'
        });

        const isTokenValid = bcrypt.compareSync(token, data.verification_token);

        if(!isTokenValid) return res.status(401).json({ 
            message: 'Invalid verification token!',
            status: 'invalid-token'
        });

        data.is_verified = true;
        data.verification_token = null;
        data.verification_token_expiry = null;

        await data.save();

        res.status(200).json({ 
            message: 'Verification success!',
            status: 'success'
        });

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
        if(!data) return res.status(401).json({
            success: false,
            error: {
            type: "VALIDATION_ERROR",
            details: [{
                field: 'email',
                message: 'Your email is not registered yet'
            }]   
            }
        });
        const comparePass = bcrypt.compareSync(req.body.password, data.password);
        const remember = req.body.remember;
        if(comparePass) {
            let maxAge = 0;
            let jwtExp = '';
            if(remember){
                maxAge = 7 * 24 * 60 * 60 * 1000;
                jwtExp = '7d';
            } else {
                maxAge = 60 * 1000 * 60;
                jwtExp = '1h';
            }

            var token = jwt.sign({
                id: data.id,
                role: data.role
            },
                process.env.JWT_SECRET,
            {
                expiresIn: jwtExp
            }
            );

        
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge,
                signed: true
            });

            return res.status(200).json({
                success: true,
                data: {
                    token,
                    user: {
                        id: data.id,
                        email: data.email
                    }
                },
                remember
            });

        } else {
            return res.status(401).json({
                success: false,
                error: {
                type: "VALIDATION_ERROR",
                details: [{
                    field: 'password',
                    message: 'Incorrect password'

                }]   
                }
            });
        }
    } catch (e) {
        res.status(500).json({message: `${e.name}`})
    }
};

const signOut = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Sign out success" });
};

const getMe = (req, res) => {
  const token = req.signedCookies.token || req.cookies.token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ userId: decoded.id });
  } catch {
    res.status(401).json({ message: "Invalid token", status: 'expired' });
  }
}


module.exports = { 
    signUp,
    signIn,
    signOut,
    authVerify,
    getMe,
    checkVerify
};