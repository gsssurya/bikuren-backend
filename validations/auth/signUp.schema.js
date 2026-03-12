const userSchema = require('../user/user.schema');
const Joi = require('joi');

const signUpSchema = Joi.object({
    name: userSchema
        .extract('name'),
    email: userSchema
        .extract('email'),
    password: userSchema
        .extract('password'),
    phone: userSchema
        .extract('phone'),
    country: userSchema
        .extract('country'),
    passport: userSchema
        .extract('passport'),
    room_number: userSchema
        .extract('room_number')
        .allow('', null),
    address: userSchema
        .extract('address'),
});

module.exports = signUpSchema;