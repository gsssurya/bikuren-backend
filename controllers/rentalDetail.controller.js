const { Bike } = require('../models');
const RentalDetail = require('../models/RentalDetail');

const exclude = ['created_at', 'updated_at', 'deleted_at'];

const getRentalDetails = async (req, res) => {
    try {
        const { expand = '' } = req.query;
        const includes = [];

        if(expand.includes('bike')){
            includes.push({
                model: Bike,
                as: 'bike',
                attributes: {
                    exclude
                }
            })
        };
        const data = await RentalDetail.findAll({
            include: includes,
            attributes: {
                exclude: ['deleted_at']
            }
        });
        if(!data) return res.status(404).json({ message: 'Rental detail is empty!' });
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const getRentalDetailById = async (req, res) => {
    try {
        const { id } = req.params;
        const { expand = '' } = req.query;
        const includes = [];

        if(expand.includes('bike')){
            includes.push({
                model: Bike,
                as: 'bike',
                attributes: {
                    exclude
                }
            })
        };
        const data = await RentalDetail.findByPk(id, {
            include: includes,
            attributes: {
                exclude: ['deleted_at']
            }
        });
        if(!data) return res.status(404).json({ message: 'Rental detail not found!' })
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const createRentalDetail = async (req, res) => {
    try {
        await RentalDetail.create(req.body);
        res.status(200).json({ message: 'Rental detail added!' });
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const updateRentalDetail = async (req, res) => {
    try {
        const { id } = req.params;
        await RentalDetail.update(req.body, {
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
