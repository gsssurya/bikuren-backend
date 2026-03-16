const userService = require("../services/userService");
const catchAsync = require("../utils/CatchAsync");

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getUsers();
    res.status(200).json({
        status: "success",
        data: users,
    });
});

const getUserById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(200).json({
        status: "success",
        data: user,
    });
})

const createUser = catchAsync( async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(201).json({
        status: "success",
        data: user,
    });
});

const updateUser = catchAsync( async (req, res) => {
    const { id } = req.params;
    await userService.updateUser(id, req.body);
    res.status(200).json({
        status: "success",
        message: "User updated successfully"
    })
})

const deleteUser = catchAsync( async (req, res) => {
    const { id } = req.params;
    await userService.deleteUser(id, req.user.id);
    res.status(200).json({
        status: "success",
        message: "User deleted successfully"
    })
})

const restoreUser = catchAsync( async (req, res) => {
    const { id } = req.params;
    await userService.restoreUser(id);
    res.status(200).json({
        status: "success",
        message: `User by ID = ${id} restored!`
    })  
})

const uploadFoto = catchAsync( async (req, res) => {
    const { id } = req.user;
    if (!req.file) {
        throw new AppError("Image is required", 400);
    }
    const imageUrl = `uploads/profiles/${req.file.filename}`;
    await userService.uploadFoto(id, {
        image: imageUrl
    });
    res.status(200).json({
        status: "success",
        message: `Upload success!`
    })  
})

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    restoreUser,
    createUser,
    uploadFoto
}