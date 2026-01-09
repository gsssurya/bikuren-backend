const express = require('express');
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');

const {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    restoreUser
} = require('../controllers/user.controller')

const router = express.Router();

router.get('/', auth, getUsers);
router.get('/:id', auth, getUserById);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, authorize('admin'), deleteUser);
router.patch('/:id/restore', auth, authorize('admin'), restoreUser);

module.exports = router;