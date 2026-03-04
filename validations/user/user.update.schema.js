const userSchema = require('./user.schema');

const updateUserSchema = userSchema
  .fork(
    Object.keys(userSchema.describe().keys),
    field => field.optional()
  )
  .fork(['role'], field => field.forbidden())
  .min(1);

module.exports = updateUserSchema;