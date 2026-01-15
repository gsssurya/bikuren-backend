const rentalSchema = require('./rental.schema');

const updateRentalSchema = rentalSchema
  .fork(
    Object.keys(rentalSchema.describe().keys),
    field => field.optional()
  )
  .min(1);

module.exports = updateRentalSchema;