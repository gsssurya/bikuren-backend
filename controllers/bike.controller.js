const Bike = require('../models/Bike');
const bikeSchema = require ('../validations/bike.schema');

const getBikes = async (req, res) => {
    try {
        const data = await Bike.findAll();
        res.status(200).json(data)
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const getBikeById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Bike.findByPk(id);
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const createBike = async (req, res) => {
    try {
        const { error, value } = bikeSchema.validate(req.body);
        if(error) throw error;
        await Bike.create(value);
        res.status(200).json({ message: 'Bike added!' })
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
}

const updateBikeById = async (req, res) => {
    try {
        const { id } = req.params;
        const { error, value } = bikeSchema.validate(req.body);
        if(error) throw error;
        await Bike.update(value, {
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