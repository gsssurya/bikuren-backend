const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string()
        .max(100)
        .required(),
    plate_number: Joi.string()
        .min(1)
        .max(20)
        .required(),
    price: Joi.number()
        .max(1000000000)
        .required(),
    status: Joi.string(),
});

module.exports = schema;