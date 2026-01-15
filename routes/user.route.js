const express = require('express');
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const validate = require('../middleware/validate.middleware');
const getByIdSchema = require('../validations/id.schema');
const updateUserSchema = require('../validations/user/user.update.schema');
const userSchema = require('../validations/user/user.schema');
const checkEmail = require('../middleware/checkEmail.middleware');

const {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    restoreUser,
    createUser
} = require('../controllers/user.controller')

const router = express.Router();

router.get(
    '/',
    auth,
    getUsers
);

router.get(
    '/:id',
    auth,
    validate(getByIdSchema,'params'),
    getUserById
);

router.post(
    '/',
    auth,
    authorize('admin'),
    checkEmail,
    validate(userSchema),
    createUser
)

router.put(
    '/:id',
    auth,
    validate(getByIdSchema, 'params'),
    validate(updateUserSchema),
    updateUser
);

router.delete(
    '/:id',
    auth, 
    authorize('admin'), 
    validate(getByIdSchema,'params'),
    deleteUser
);

router.patch(
    '/:id/restore', 
    auth, 
    authorize('admin'),
    validate(getByIdSchema,'params'),
    restoreUser
);

module.exports = router;

