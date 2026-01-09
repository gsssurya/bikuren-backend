const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const sequelize = require('./utils/db.util');
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const bikeRoute = require('./routes/bike.route');
const rentalRoute = require('./routes/rental.route');
const RentalDetailRoute = require('./routes/rentalDetail.route');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.json());

app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/bikes', bikeRoute);
app.use('/rentals', rentalRoute);
app.use('/rental-details', RentalDetailRoute);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Bikuren Backend!'});
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
};

app.listen(process.env.PORT, () => {
    console.log('Server running!');
});