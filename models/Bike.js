const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db.util');

const Bike = sequelize.define ('Bike', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull:false,
    },
    plate_number: {
        type: DataTypes.STRING(20),
        allowNull:false,
        unique:true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull:false,
    },
    image: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM,
        values: ['available', 'rented', 'maintenance'],
        defaultValue: 'available',
    }
}, {
    tableName: 'bikes',
    timestamps:true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
});

module.exports = Bike;
