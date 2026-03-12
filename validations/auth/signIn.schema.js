const userSchema = require('../user/user.schema');
const Joi = require('joi');

const signInSchema = Joi.object({
    email: userSchema.extract('email')
        .required()
        .messages({
            "string.email": "Email must be valid (e.g. user@gmail.com)",
            "string.empty": "Email is required",
            "any.required": "Email is required"}),
    password: Joi.string()
        .max(30)
        .messages({
            "string.empty": "Password is required",
            "any.required": "Password is required",
        })
        .required(),
    remember: Joi.bool()
        .required()
});

module.exports = signInSchema;