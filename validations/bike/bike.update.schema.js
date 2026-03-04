const bikeSchema = require('./bike.schema');

const updateBikeSchema = bikeSchema
  .fork(
    Object.keys(bikeSchema.describe().keys),
    field => field.optional()
  )
  .min(1);

module.exports = updateBikeSchema;