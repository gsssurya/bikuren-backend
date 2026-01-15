const express = require('express');
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const validate = require('../middleware/validate.middleware');
const getByIdSchema = require('../validations/id.schema');
const rentalDetailSchema = require('../validations/rental-detail/rentalDetail.schema');
const updateRentalDetailSchema = require('../validations/rental-detail/rentalDetail.update.schema');
const rentalDetailExpandSchema = require('../validations/rental-detail/rentalDetail.expand.schema')
const {
    getRentalDetails,
    getRentalDetailById,
    createRentalDetail,
    updateRentalDetail,
    deleteRentalDetail,
    restoreRentalDetail
} = require('../controllers/rentalDetail.controller');

const router = express.Router();

router.get(
    '/', 
    auth, 
    validate(rentalDetailExpandSchema, 'query'),
    getRentalDetails
);

router.get(
    '/:id',
    auth, 
    validate(getByIdSchema, 'params'),
    validate(rentalDetailExpandSchema, 'query'),
    getRentalDetailById
);

router.post(
    '/',
    auth,
    validate(rentalDetailSchema),
    createRentalDetail
);

router.put(
    '/:id',
    auth, 
    authorize('admin'), 
    validate(getByIdSchema, 'params'),
    validate(updateRentalDetailSchema),
    updateRentalDetail
);

router.delete(
    '/:id', 
    auth, 
    authorize('admin'), 
    validate(getByIdSchema, 'params'),
    deleteRentalDetail
);

router.patch(
    '/:id/restore', 
    auth, 
    authorize('admin'), 
    validate(getByIdSchema, 'params'),
    restoreRentalDetail
);

module.exports = router;
