const Bike = require('../models/Bike');

const getBikes = async (req, res) => {
    try {
        const data = await Bike.findAll({
            attributes: {
                exclude: ['deleted_at']
            }
        });
        if(data.length === 0) return res.status(404).json({ message: 'Bike is empty!' });
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
        const [affectedCount] = await Bike.update(req.body, {
            where: {
                id,
            }
        });
        if(affectedCount === 0){
            return res.status(404).json({ message: `Update failed. Bike not found!` })
        }
        res.status(200).json({ message: 'Bike updated!' })
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const deleteBikeById = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedCount = await Bike.destroy({
            where: {
                id,
            }
        });
        if(affectedCount === 0){
            return res.status(404).json({ message: `Delete failed. Bike not found!` })
        }
        res.status(200).json({ message: 'Bike deleted!' });
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const restoreBikeById = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedCount = await Bike.restore({
            where: {
                id,
            }
        })
        if(affectedCount === 0){
            return res.status(404).json({ message: `Restore failed. Bike not found!` })
        }
        res.status(200).json({ message: `Bike by ID = ${id} restored!` })
    } catch (e) {
        res.status(500).json({ message: `${e}` });
    }
};

const uploadBikeFoto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const imageUrl = `uploads/bikes/${req.file.filename}`
        const [affectedCount] = await Bike.update({
            image: imageUrl,
        }, {
            where: {
                id
            }
        });
        if(affectedCount === 0){
            return res.status(404).json({ message: `Upload failed. Bike not found!` })
        }
        res.status(200).json({
            message: 'Upload success!',
            bikeId: id,
            file: req.file.filename,
            url: imageUrl
        });
    } catch (e) {
         res.status(200).json({ message: `${e}` });
    }
};

module.exports = {
    getBikes,
    getBikeById,
    createBike,
    updateBikeById,
    deleteBikeById,
    restoreBikeById,
    uploadBikeFoto
};