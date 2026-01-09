const Joi = require('joi');

const loginSchema = Joi.object ({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net']}})
        .required(),
    password: Joi.string()
        .min(8)
        .max(150)
        .required()
});

module.exports = loginSchema;