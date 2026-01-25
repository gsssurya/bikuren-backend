const userSchema = require('../user/user.schema');
const Joi = require('joi');

const signInSchema = Joi.object({
    email: userSchema.extract('email').required(),
    password: Joi.string()
        .min(8)
        .max(30)
        .required(),
});

module.exports = signInSchema;