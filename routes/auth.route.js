const express = require('express');
const auth = require('../middleware/auth.middleware');
const guestOnly = require('../middleware/guestOnly.middleware');
const checkEmail = require('../middleware/checkEmail.middleware');
const {
    signUp,
    signIn,
    signOut,
    authVerify,
} = require('../controllers/auth.controller')

const router = express.Router();

router.post('/signup', guestOnly, checkEmail, signUp);
router.post('/signin', guestOnly, signIn);
router.post('/signout', auth, signOut);
router.get('/:token', guestOnly, authVerify);


module.exports = router;