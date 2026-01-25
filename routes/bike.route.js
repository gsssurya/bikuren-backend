const express = require('express');
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/authorize.middleware');
const validate = require('../middleware/validate.middleware');
const getByIdSchema = require('../validations/id.schema');
const bikeSchema = require('../validations/bike/bike.schema');
const updateBikeSchema = require('../validations/bike/bike.update.schema');
const uploadSingle = require('../middleware/upload.middleware');

const { 
    getBikes,
    getBikeById,
    createBike,
    updateBikeById,
    deleteBikeById,
    restoreBikeById,
    uploadBikeFoto,
 } = require('../controllers/bike.controller');

const router = express.Router();

router.get(
    '/', 
    getBikes
);

router.get(
    '/:id', 
    validate(getByIdSchema, 'params'), 
    getBikeById
);

router.post(
    '/', 
    auth, 
    authorize('admin'), 
    validate(bikeSchema),
    createBike
);

router.put(
    '/:id', 
    auth, 
    authorize('admin'), 
    validate(getByIdSchema, 'params'),
    validate(updateBikeSchema),
    updateBikeById
);

router.delete(
    '/:id', 
    auth, 
    authorize('admin'), 
    validate(getByIdSchema, 'params'), 
    deleteBikeById
);

router.patch(
    '/:id', 
    auth, 
    authorize('admin'), 
    validate(getByIdSchema, 'params'), 
    restoreBikeById
);

router.post(
    '/:id/upload',
    auth,
    authorize('admin'),
    validate(getByIdSchema, 'params'),
    uploadSingle('bikes'),
    uploadBikeFoto
);

module.exports = router;