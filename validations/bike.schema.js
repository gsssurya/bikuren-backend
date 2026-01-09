const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string()
        .max(100)
        .required(),
    plate_number: Joi.string()
        .min(1)
        .max(20)
        .required(),
    price: Joi.number()
        .max(1000000000)
        .required(),
    status: Joi.string(),
});

module.exports = schema;

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