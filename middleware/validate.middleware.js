const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property]);
        if(error) return res.status(500).json({ message: `${error}` });
        req[property] = value;
        next();
    }
}

module.exports = validate;

