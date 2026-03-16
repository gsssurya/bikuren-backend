const express = require('express');
const auth = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/authorize.middleware');
const validate = require('../middlewares/validate.middleware');
const getByIdSchema = require('../validations/id.schema');
const updateUserSchema = require('../validations/user/user.update.schema');
const userSchema = require('../validations/user/user.schema');
const uploadSingle = require('../middlewares/upload.middleware');
const userController = require("../controllers/user.controller");
const router = express.Router();

router.get(
    "/",
    auth,
    userController.getUsers
);

router.get(
    "/:id", 
    auth, 
    validate(getByIdSchema, "params"),
    userController.getUserById
);

router.post(
    "/",
    auth,
    authorize(['admin']),
    validate(userSchema),
    userController.createUser
)

router.put(
    '/:id',
    auth,
    validate(getByIdSchema, 'params'),
    validate(updateUserSchema),
    userController.updateUser
);

router.delete(
    '/:id',
    auth, 
    authorize(['admin']), 
    validate(getByIdSchema,'params'),
    userController.deleteUser
);

router.patch(
    '/:id', 
    auth, 
    authorize('admin'),
    validate(getByIdSchema,'params'),
    userController.restoreUser
);

router.post(
    '/upload',
    auth,
    uploadSingle(),
    userController.uploadFoto
);

module.exports = router;

