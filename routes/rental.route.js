const express = require('express');
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/authorize.middleware');
const validate = require('../middleware/validate.middleware');
const rentalSchema = require('../validations/rental/rental.schema');
const updateRentalSchema = require('../validations/rental/rental.update.schema');
const expandRentalSchema = require('../validations/rental/rental.expand.schema');
const getByIdSchema = require('../validations/id.schema');

const {
    getRental,
    getRentalById,
    createRental,
    updateRentalById,
    deleteRentalById,
    restoreRentalById
} = require('../controllers/rental.controller');

const router = express.Router();

router.get(
    '/', 
    auth,
    validate(expandRentalSchema, 'query'), 
    getRental
);

router.get(
    '/:id', 
    auth, 
    validate(getByIdSchema, 'params'),
    validate(expandRentalSchema, 'query'), 
    getRentalById
);

router.post(
    '/', 
    auth, 
    validate(getByIdSchema, 'params'),
    validate(rentalSchema),
    createRental
);

router.put(
    '/:id',
    auth,
    authorize('admin'),
    validate(getByIdSchema, 'params'),
    validate(updateRentalSchema),
    updateRentalById
);

router.delete(
    '/:id', 
    auth, 
    authorize('admin'), 
    validate(getByIdSchema, 'params'),
    deleteRentalById
);

router.patch(
    '/:id', 
    auth, 
    authorize('admin'), 
    validate(getByIdSchema, 'params'),
    restoreRentalById
);

module.exports = router;

