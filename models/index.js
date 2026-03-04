const User = require('./User');
const Rental = require('./Rental');
const RentalDetail = require('./RentalDetail');
const Bike = require('./Bike');

const fk = {
  Rental,
  RentalDetail,
  Bike,
  User
}

Rental.hasMany(RentalDetail, {
  foreignKey: 'rental_id',
  as: 'detail',       
  onDelete: 'CASCADE'
});

RentalDetail.belongsTo(Rental, {
  foreignKey: 'rental_id',
  as: 'rental'        
});

Bike.hasMany(RentalDetail, {
  foreignKey: 'bike_id',
  onDelete: 'RESTRICT'
});

RentalDetail.belongsTo(Bike, {
  foreignKey: 'bike_id',
  as: 'bike'
});

User.hasMany(Rental, {
  foreignKey: 'user_id',
  as: 'rental',
  onDelete: 'RESTRICT'
});

Rental.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

module.exports = fk;