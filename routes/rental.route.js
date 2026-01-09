const express = require('express');
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');

const {
    getRental,
    getRentalById,
    createRental,
    updateRentalById,
    deleteRentalById,
    restoreRentalById
} = require('../controllers/rental.controller');

const router = express.Router();

router.get('/', auth, getRental);
router.get('/:id', auth, getRentalById);
router.post('/', auth, createRental);
router.put('/:id', auth, authorize('admin'), updateRentalById);
router.delete('/:id', auth, authorize('admin'), deleteRentalById);
router.patch('/:id/restore', auth, authorize('admin'), restoreRentalById);

module.exports = router;