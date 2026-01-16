const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db.util');

const User = sequelize.define(
    'User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: false,
        }, 
        country: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        passport: {
            type: DataTypes.STRING(25),
        }, 
        address: {
            type: DataTypes.TEXT,
        },
        room_number: {
            type: DataTypes.STRING(10),
        },
        role: {
            type: DataTypes.ENUM,
            values: ['admin', 'member'],
            defaultValue: 'member',
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        verification_token: {
            type: DataTypes.STRING,
        },
        verification_token_expiry: {
            type: DataTypes.DATE
        }
    }, {
        tableName: 'users',
        timestamps: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true,
    }
);

module.exports = User;

/*
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    country VARCHAR(50) NOT NULL,
    passport VARCHAR(25),
    address TEXT,
    room_number VARCHAR(10),
    role ENUM('admin', 'member') DEFAULT 'member',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);
*/

