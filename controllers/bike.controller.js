const Bike = require('../models/Bike');

const getBikes = async (req, res) => {
    try {
        const data = await Bike.findAll({
            attributes: {
                exclude: ['deleted_at']
            }
        });
        if(!data) return res.status(404).json({ message: 'Bike is empty!' });
        res.status(200).json(data)
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const getBikeById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Bike.findByPk(id, {
            attributes: {
                exclude: ['deleted_at']
            }
        });
        if(!data) return res.status(404).json({ message: 'Bike not found!' });
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const createBike = async (req, res) => {
    try {
        await Bike.create(req.body);
        res.status(200).json({ message: 'Bike added!' })
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
}

const updateBikeById = async (req, res) => {
    try {
        const { id } = req.params;
        await Bike.update(req.body, {
            where: {
                id,
            }
        });
        res.status(200).json({ message: 'Bike updated!' })
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const deleteBikeById = async (req, res) => {
    try {
        const { id } = req.params;
        await Bike.destroy({
            where: {
                id,
            }
        });
        res.status(200).json({ message: 'Bike deleted!' });
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const restoreBikeById = async (req, res) => {
    try {
        const { id } = req.params;
        await Bike.restore({
            where: {
                id,
            }
        })
        res.status(200).json({ message: `Bike by ID = ${id} restored!` })
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

module.exports = {
    getBikes,
    getBikeById,
    createBike,
    updateBikeById,
    deleteBikeById,
    restoreBikeById,
};

/* 
CREATE TABLE bikes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    plate_number VARCHAR(20) NOT NULL UNIQUE,
    price DECIMAL(10,2) NOT NULL,
    status ENUM('available', 'rented', 'maintenance') DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);
*/