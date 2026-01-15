const User = require('../models/User');
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
    try {
        const data = await User.findAll({
            attributes: { exclude: ['password', 'deleted_at'] }
        });
        if(!data) return res.status(404).json({ message: 'User is empty!' })
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await User.findByPk(id, {
            attributes: { exclude: ['password', 'deleted_at'] }
        });
        if(!data) return res.status(404).json({ message: 'User not found!' })
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const createUser = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;
        await User.create(req.body);
        res.status(200).json({ message: 'User added!' })
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.update(req.body, {
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
    createUser
}