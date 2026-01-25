const express = require('express');
const auth = require('../middleware/auth.middleware');
const guestOnly = require('../middleware/guestOnly.middleware');
const checkEmail = require('../middleware/checkEmail.middleware');
const validate = require('../middleware/validate.middleware');
const signUpSchema = require('../validations/auth/signUp.schema');
const signInSchema = require('../validations/auth/signIn.schema');
const verifySchema = require('../validations/auth/verify.schema');


const {
    signUp,
    signIn,
    signOut,
    authVerify,
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
    auth,
    signOut
);

router.get(
    '/:id/:token', 
    validate(verifySchema, 'params'),
    authVerify
);

module.exports = router;