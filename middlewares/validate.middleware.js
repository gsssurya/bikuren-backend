const validate = (schema, property = "body") => {
  return (req, res, next) => {

    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return res.status(400).json({
        success: false,
        error: {
          type: "VALIDATION_ERROR",
          details: error.details.map(err => ({
            field: err.context.key,
            message: err.message.replace(/"/g, "")
          }))
        }
      });
    }

    req[property] = value;

    next();
  };
};

module.exports = validate;