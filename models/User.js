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
        },
        image: {
            type: DataTypes.STRING
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

