const { Rental, RentalDetail, Bike, User } = require('../models');

const exclude = ['created_at', 'updated_at', 'deleted_at'];

const getRental = async (req, res) => {
    try {
        const { expand = '' } = req.query ;
        const includes = [];

        if (expand.includes('user')){
            includes.push({
                model: User,
                as: 'user',
                attributes: {
                    exclude: [
                        ...exclude,
                        'password',
                        'is_verified',
                        'verification_token',
                        'verification_token_expiry',
                        'role'
                    ]
                }
            })
        };

        if (expand.includes('detail')){
            const detailExpand = [];
            if (expand.includes('bike')){
               detailExpand.push({
                    model: Bike,
                    as: 'bike',
                    attributes: {
                        exclude
                    }
                });
            }
            includes.push({
                model: RentalDetail,
                as: 'detail',
                include: detailExpand,
                attributes: {
                    exclude
                }
            })
        };
        
        const data = await Rental.findAll({
            include: includes,
            attributes: {
                    exclude: ['deleted_at']
                }
        });

        if(data.length === 0) return res.status(404).json({ message: 'Rental is empty!' });
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const getRentalById = async (req, res) => {
    try {
        const { id } = req.params
        const { expand = '' } = req.query;
        const includes = [];

        if (expand.includes('user')){
            includes.push({
                model: User,
                as: 'user',
                attributes: {
                    exclude : [...exclude, 'password', , 'role']
                }
            })
        };

        if (expand.includes('detail')){
            const detailExpand = [];
            if (expand.includes('bike')){
               detailExpand.push({
                    model: Bike,
                    as: 'bike',
                    attributes: {
                        exclude
                    }
                });
            }
            includes.push({
                model: RentalDetail,
                as: 'detail',
                include: detailExpand,
                attributes: {
                    exclude
                }
            })
        };
        
        const data = await Rental.findByPk(id, {
            include: includes,
            attributes: {
                    exclude: ['deleted_at']
                }
        });
        if(!data) return res.status(404).json({ message: 'Rental not found!' })
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const createRental = async (req, res) => {
    try {
        const data = await Rental.create({
            ...req.body,
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
        const { id } = req.params;
        const [affectedCount] = await Rental.update(req.body, {
            where: {
                id,
            }
        });
        if(affectedCount === 0){
            return res.status(404).json({ message: `Update failed. Rental not found!` })
        }
        res.status(200).json({ message: 'Rental Updated!' });
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const deleteRentalById = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedCount = await Rental.destroy({
            where: {
                id,
            }
        });
        if(affectedCount === 0){
            return res.status(404).json({ message: `Delete failed. Rental not found!` })
        }
        res.status(200).json({ message: 'Rental deleted!' })
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const restoreRentalById = async(req, res) => {
    try {
        const { id } = req.params;
        const affectedCount = await Rental.restore({
            where: {
                id,
            }
        });
        if(affectedCount === 0){
            res.status(404).json({ message: `Restore failed. Rental not found!` })
        }
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