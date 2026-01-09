const RentalDetail = require('../models/RentalDetail');
const rentalDetailSchema = require('../validations/rentalDetail.schema');

const getRentalDetails = async (req, res) => {
    try {
        const data = await RentalDetail.findAll();
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const getRentalDetailById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await RentalDetail.findByPk(id);
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const createRentalDetail = async (req, res) => {
    try {
        const { error, value } = rentalDetailSchema.validate(req.body);
        if(error) throw error;
        await RentalDetail.create(value);
        res.status(200).json({ message: 'Rental detail added!' });
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const updateRentalDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const { error, value } = rentalDetailSchema.validate(req.body);
        if(error) throw error;
        await RentalDetail.update(value, {
            where: {
                id,
            }
        });
        res.status(200).json({ message: 'Rental detail updated!' });
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
}

const deleteRentalDetail = async (req, res) => {
    try {
        const { id } = req.params;
        await RentalDetail.destroy({
            where: {
                id,
            }
        });
        res.status(200).json({ message: 'Rental detail deleted!' });
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const restoreRentalDetail = async (req, res) => {
    try {
        const { id } = req.params;
        await RentalDetail.restore({
            where: {
                id,
            }
        });
        res.status(200).json({ message: `Rental detail by ID = ${id} restored!` })
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

module.exports = {
    getRentalDetails,
    getRentalDetailById,
    createRentalDetail,
    updateRentalDetail,
    deleteRentalDetail,
    restoreRentalDetail
}
