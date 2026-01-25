const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db.util');

const Rental = sequelize.define ('Rental', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull:false,
    },
    status: {
        type: DataTypes.ENUM,
        values: ['pending', 'ongoing', 'finished', 'cancelled'],
        defaultValue: 'pending'
    },
},{
    tableName: 'rentals',
    timestamps:true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
});

module.exports = Rental;
