const Joi = require('joi');

const allowedExpand = ['user', 'detail', 'bike'];

const schema = Joi.object({
    expand: Joi.string()
        .custom((value, helpers) => {
            const list = value.split(',');
            const invalid = list.filter(
                v => !allowedExpand.includes(v)
            );
            if (invalid.length){
                return helpers.error(
                    'any.invalid',
                    { value: invalid.join(',') }
                );
            }
            return value;
        })
});

module.exports = schema;