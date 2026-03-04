const Joi = require('joi');

const getByIdSchema = Joi.object({
    id: Joi.number()
        .min(1)
});

module.exports = getByIdSchema;

