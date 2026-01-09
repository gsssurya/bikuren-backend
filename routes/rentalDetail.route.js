const express = require('express');
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const {
    getRentalDetails,
    getRentalDetailById,
    createRentalDetail,
    updateRentalDetail,
    deleteRentalDetail,
    restoreRentalDetail
} = require('../controllers/rentalDetail.controller');

const router = express.Router();

router.get('/', auth, getRentalDetails);
router.get('/:id',auth, getRentalDetailById);
router.post('/',auth, createRentalDetail);
router.put('/:id', auth, authorize('admin'), updateRentalDetail);
router.delete('/:id', auth, authorize('admin'), deleteRentalDetail);
router.patch('/:id', auth, authorize('admin'), restoreRentalDetail);

module.exports = router;