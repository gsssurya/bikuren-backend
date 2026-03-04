const Joi = require('joi');

const verifySchema = Joi.object({
    id: Joi.number()
        .min(1)
        .required(),
    token: Joi.string()
        .required()
});

module.exports = verifySchema;

