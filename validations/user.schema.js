const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string()
        .max(150)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net']}})
        .required(),
    password: Joi.string()
        .min(8)
        .max(150)
        .required(),
    phone: Joi.string()
        .min(9)
        .max(20)
        .required(),
    country: Joi.string()
        .min(3)
        .max(50)
        .required(),
    passport: Joi.string()
        .max(25),
    address: Joi.string()
        .max(255),
    room_number: Joi.string()
        .max(10),
});

module.exports = schema;

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