const Rental = require('../models/Rental');
const rentalSchema = require('../validations/rental.schema');

const getRental = async (req, res) => {
    try {
        const data = await Rental.findAll();
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const getRentalById = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Rental.findByPk(id)
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const createRental = async (req, res) => {
    try {
        const { error, value } = rentalSchema.validate(req.body);
        if(error) throw error;
        const data = await Rental.create({
            ...value,
            user_id: req.user.id,
        });
        res.status(200).json({ 
            message: 'Rental added!',
            id: data.id,
        });
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const updateRentalById = async (req, res) => {
    try {
        const { error, value } = rentalSchema.validate(req.body);
        if(error) throw error;
        const { id } = req.params;
        await Rental.update(value, {
            where: {
                id,
            }
        });
        res.status(200).json({ message: 'Rental Updated!' });
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const deleteRentalById = async (req, res) => {
    try {
        const { id } = req.params;
        await Rental.destroy({
            where: {
                id,
            }
        });
        res.status(200).json({ message: 'Rental deleted!' })
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const restoreRentalById = async(req, res) => {
    try {
        const { id } = req.params;
        await Rental.restore({
            where: {
                id,
            }
        });
        res.status(200).json({ message: `Rental by ID = ${id} restored!`})
    } catch (e) {
        res.status(500).json({ message: `${e}`});
    }
};

module.exports = {
    getRental,
    getRentalById,
    createRental,
    updateRentalById,
    deleteRentalById,
    restoreRentalById
};