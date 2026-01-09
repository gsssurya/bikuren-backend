const Joi = require('joi');
const dayjs = require('dayjs');

const today = dayjs().format('YYYY-MM-DD');

const schema = Joi.object({
    rental_id: Joi.number()
        .required(),
    bike_id: Joi.number()
        .required(),
    rental_date: Joi.date()
        .min(today)
        .required(),
    finish_at: Joi.date()
        .greater(Joi.ref('rental_date'))
        .required(),
});

module.exports = schema;
/* 
CREATE TABLE rental_details (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    rental_id INT NOT NULL,
    bike_id INT NOT NULL,
    rental_date DATE NOT NULL,
    finish_at DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    CONSTRAINT fk_rental_details_rental
        FOREIGN KEY (rental_id) REFERENCES rentals(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_rental_details_bike
        FOREIGN KEY (bike_id) REFERENCES bikes(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);
*/