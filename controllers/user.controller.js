const User = require('../models/User');
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
    try {
        const data = await User.findAll({
            where: { 
                is_verified: true 
            },
            attributes: { 
                exclude: [
                    'password',
                    'deleted_at',
                    'is_verified',
                    'verification_token',
                    'verification_token_expiry'
                ]},
        });
        if(data.length === 0) return res.status(404).json({ message: 'User is empty!' })
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await User.findOne({
            where: { 
                id,
                is_verified: true 
            },
            attributes: {  exclude: [
                    'password',
                    'deleted_at',
                    'is_verified',
                    'verification_token',
                    'verification_token_expiry'
                ]},
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
        const { email, password, ...rest} = req.body
        const salt = bcrypt.genSaltSync(10);
        let userPayload = {
            ...rest,
        }
        if(password){
           userPayload.password = bcrypt.hashSync(password, salt);
        }
        if(email){
            userPayload.email = email;
            userPayload.is_verified = false;
        }
        const [affectedCount] = await User.update(userPayload, {
            where: {
                id,
                is_verified: true
            }
        });
        if(affectedCount === 0) {
            return res.status(404).json({ 
                message: 'Update failed. User not found or not verified!'
            });
        }
        res.status(200).json({ message: 'User updated!' });
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedCount = await User.destroy({
            where: {
                id,
            }
        });
        if(affectedCount === 0) {
            return res.status(404).json({ 
                message: 'Delete failed. User not found or not verified!'
            });
        }
        res.status(200).json({ message: 'User deleted!' });
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const restoreUser = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedCount = await User.restore({
            where: {
                id,
            }
        });
        if(affectedCount === 0) {
            return res.status(404).json({ 
                message: 'Restore failed. User not found or not verified!'
            });
        }
        res.status(200).json({ message: `User by ID = ${id} restored!` })
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const uploadProfileFoto = async (req, res, next) => {
    try {
        const { id } = req.user;
        const imageUrl = `uploads/profiles/${req.file.filename}`;
        const [affectedCount] = await User.update({
            image: imageUrl
        }, {
            where: {
                id,
                is_verified: true
            }
        })
        if(affectedCount === 0) {
            return res.status(404).json({ 
                message: 'Upload failed. User not found or not verified!'
            });
        };
        res.status(200).json({
            message: 'Upload success!',
            userId: id,
            file: req.file.filename,
            url: imageUrl
        });
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    restoreUser,
    createUser,
    uploadProfileFoto
}