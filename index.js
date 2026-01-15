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
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.post('/photos/upload', upload.array('foto', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  try {
    res.status(200).json({ message: 'Uploads success!' });
  } catch (e) {
    res.status(200).json({ message: `${e}` });
  }
})

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