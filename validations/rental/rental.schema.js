const Joi = require('joi');

const schema = Joi.object({
    total: Joi.number()
        .min(1)
        .max(1000000000)
        .required(),
    status: Joi.string()
});

module.exports = schema;

/* 
CREATE TABLE rentals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    rental_date DATE NOT NULL,
    total DECIMAL(12,2) NOT NULL,
    status ENUM('pending', 'ongoing', 'finished', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    CONSTRAINT fk_rentals_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

*/