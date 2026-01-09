const User = require('../models/User');
const userSchema = require('../validations/user.schema');

const getUsers = async (req, res) => {
    try {
        const data = await User.findAll();
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await User.findByPk(id);
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { error, value } = userSchema.validate(req.body);
        if (error) throw error;
        await User.update(value, {
            where: {
                id,
            }
        });
        res.status(200).json({ message: 'User updated!' });
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.destroy({
            where: {
                id,
            }
        })
        res.status(200).json({ message: 'User deleted!' });
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const restoreUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.restore({
            where: {
                id,
            }
        })
        res.status(200).json({ message: `User by ID = ${id} restored!` })
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
}

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    restoreUser,
}