const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string()
        .max(150)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net']}})
        .required(),
    password: Joi.string()
        .min(8)
        .max(150)
        .required(),
    phone: Joi.string()
        .min(9)
        .max(20)
        .required(),
    country: Joi.string()
        .min(3)
        .max(50)
        .required(),
    passport: Joi.string()
        .max(25),
    address: Joi.string()
        .max(255),
    room_number: Joi.string()
        .max(10),
    role: Joi.string(),
});

module.exports = schema;