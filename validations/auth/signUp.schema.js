const userSchema = require('../user/user.schema');
const Joi = require('joi');

const signUpSchema = Joi.object({
    name: userSchema.extract('name').required(),
    email: userSchema.extract('email').required(),
    password: userSchema.extract('password').required(),
    phone: userSchema.extract('phone').required(),
    country: userSchema.extract('country').required(),
    passport: userSchema.extract('passport').required(),
    address: userSchema.extract('address').required(),
    room_number: userSchema.extract('room_number')
});

module.exports = signUpSchema;