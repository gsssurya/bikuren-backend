const rentalDetailSchema = require('./rentalDetail.schema');

const updateRentalDetailSchema = rentalDetailSchema
  .fork(
    Object.keys(rentalDetailSchema.describe().keys),
    field => field.optional()
  )
  .min(1);

module.exports = updateRentalDetailSchema;