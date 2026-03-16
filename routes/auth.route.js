const express = require('express');
const auth = require('../middlewares/auth.middleware');
const guestOnly = require('../middlewares/guestOnly.middleware');
const checkEmail = require('../middlewares/checkEmail.middleware');
const validate = require('../middlewares/validate.middleware');
const signUpSchema = require('../validations/auth/signUp.schema');
const signInSchema = require('../validations/auth/signIn.schema');
const verifySchema = require('../validations/auth/verify.schema');


const {
    signUp,
    signIn,
    signOut,
    authVerify,
    getMe,
    checkVerify
} = require('../controllers/auth.controller');

const router = express.Router();

router.post(
    '/signup', 
    guestOnly, 
    validate(signUpSchema), 
    checkEmail, 
    signUp
);

router.post(
    '/signin', 
    guestOnly,
    validate(signInSchema), 
    signIn
);

router.post(
    '/signout',
    signOut
);

router.get(
    '/:id/:token', 
    validate(verifySchema, 'params'),
    authVerify
);

router.get(
    '/me',
    getMe
);

router.post(
    '/check',
    checkVerify
);

module.exports = router;