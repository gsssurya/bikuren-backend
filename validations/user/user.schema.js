const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string()
        .max(150)
        .required()
        .messages({
            'any.required': 'Name is required',
            'string.empty': 'Name is required'
        }),
    email: Joi.string()
        .email({ minDomainSegments: 1, tlds: { allow: ['com']}})
        .required()
        .messages({
            'string.email': 'Invalid email format (e.g. user@gmail.com)',
            'any.required': 'Email is required',
            'string.empty': 'Email is required'
        }),
    password: Joi.string()
        .min(8)
        .max(30)
        .pattern(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
        )
        .messages({
            'string.pattern.base': 'Must include 1 uppercase, 1 number, and 1 special character',
            'string.min': 'Password must be at least 8 characters',
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        })
        .required(),
    phone: Joi.string()
        .pattern(/^\+/)
        .messages({
            'any.required': 'Phone number is required',
            'string.empty': 'Phone number is required',
            'string.min': 'Phone number must be at least 9 characters',
            'string.max': 'Phone number must not exceed 20 characters',
            'string.base': 'Phone number must be a valid text',
            'string.pattern.base': "Phone number must start with '+' and country code (e.g. +62)"
        })
        .min(9)
        .max(20)
        .required(),
    country: Joi.string()
        .min(3)
        .max(50)
        .messages({
            'any.required': 'Please select or enter your country',
            'string.empty': 'Please select or enter your country'
        })
        .required(),
    passport: Joi.string()
        .min(6)
        .required()
        .regex(/^[A-Z0-9]+$/)
        .messages({
            'string.min': 'Passport number must be at least 6 characters',
            'string.max': 'Passport number must not exceed 25 characters',
            'string.pattern.base': 'Passport number must only contain letters and numbers',
            'any.required': 'Passport number is required',
            'string.empty': 'Passport number is required'
        })
        .max(25),
    address: Joi.string()
        .max(255)
        .required()
        .messages({
            'any.required': 'Address is required',
            'string.empty': 'Address is required'
        }),
    room_number: Joi.string()
        .max(10),
    role: Joi.string(),
});

module.exports = schema;