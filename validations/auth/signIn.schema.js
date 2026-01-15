const userSchema = require('../user/user.schema');
const Joi = require('joi');

const signInSchema = Joi.object({
    email: userSchema.extract('email').required(),
    password: userSchema.extract('password').required(),
});

module.exports = signInSchema;