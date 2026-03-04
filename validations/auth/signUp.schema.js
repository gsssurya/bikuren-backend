const userSchema = require('../user/user.schema');
const Joi = require('joi');

const signUpSchema = Joi.object({
    name: userSchema
        .extract('name')
        .required(),
    email: userSchema
        .extract('email')
        .required(),
    password: userSchema
        .extract('password')
        .min(8)
        .max(30)
        .pattern(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
        )
        .messages({
            'string.pattern.base':
                'Password must contain at least 1 uppercase letter, 1 number, and 1 special character',
            'string.min': 'Password must be at least 8 characters long'
        })
        .required(),
    phone: userSchema
        .extract('phone')
        .required(),
    country: userSchema
        .extract('country')
        .required(),
    passport: userSchema
        .extract('passport')
        .required(),
    address: userSchema
        .extract('address')
        .required(),
    room_number: userSchema
        .extract('room_number')
});

module.exports = signUpSchema;