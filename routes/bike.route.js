const express = require('express');
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const { 
    getBikes,
    getBikeById,
    createBike,
    updateBikeById,
    deleteBikeById,
    restoreBikeById
 } = require('../controllers/bike.controller');

const router = express.Router();

router.get('/', getBikes);
router.get('/:id', getBikeById);
router.post('/', auth, authorize('admin'), createBike);
router.put('/:id', auth, authorize('admin'), updateBikeById);
router.delete('/:id', auth, authorize('admin'), deleteBikeById);
router.patch('/:id/restore', auth, authorize('admin'), restoreBikeById);

module.exports = router;