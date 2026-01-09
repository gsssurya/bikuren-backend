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