const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const sequelize = require('./utils/db.util');
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const bikeRoute = require('./routes/bike.route');
const rentalRoute = require('./routes/rental.route');
const RentalDetailRoute = require('./routes/rentalDetail.route');
const cookieParser = require('cookie-parser');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');


const app = express();

app.use('/docs', express.static(path.join(__dirname, 'docs')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

try {
  const swaggerPath = path.join(__dirname, 'docs', 'bundle.yaml');
  const swaggerDocument = YAML.load(swaggerPath);

  app.use('/bikuren-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { 
    customSiteTitle: "BIKUREN API Documentation"
  }));
  console.log('Swagger loaded successfully!');
} catch (error) {
  console.error('Failed to load Swagger:', error.message);
}

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.json());

app.use(
  cors({
    origin: "http://192.168.1.21:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

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
    console.log(`Server running on http://localhost:${process.env.PORT}`);
    console.log(`Documentation running on http://localhost:${process.env.PORT}/bikuren-docs`);
});