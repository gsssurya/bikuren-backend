const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db.util');

const RentalDetail = sequelize.define ('RentalDetails', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    rental_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bike_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rental_date: {
        type: DataTypes.DATE,
        allowNull:false,
    },
    finish_at: {
        type: DataTypes.DATE,
        allowNull:false,
    },
},{
    tableName: 'rental_details',
    timestamps:true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid:true
});

module.exports = RentalDetail;