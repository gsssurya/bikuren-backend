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
    phone: Joi.string()
        .pattern(/^\+/)
        .message({
            'string.pattern.base': "Phone number must start with '+' followed by the country code (e.g., +62...)"
        })
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