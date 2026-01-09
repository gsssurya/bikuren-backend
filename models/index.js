const User = require('./User');
const Rental = require('./Rental');
const RentalDetail = require('./RentalDetail');
const Bike = require('./Bike');

Rental.hasMany(RentalDetail, {
  foreignKey: 'rental_id',
  onDelete: 'CASCADE'
});

RentalDetail.belongsTo(Rental, {
  foreignKey: 'rental_id'
});

Bike.hasMany(RentalDetail, {
  foreignKey: 'bike_id',
  onDelete: 'RESTRICT'
});

RentalDetail.belongsTo(Bike, {
  foreignKey: 'bike_id'
});

User.hasMany(Rental, {
  foreignKey: 'user_id',
  onDelete: 'RESTRICT'
});

Rental.belongsTo(User, {
  foreignKey: 'user_id'
});
