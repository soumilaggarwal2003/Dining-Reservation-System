const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

const app = express();
require('dotenv').config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sync Database
db.sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch((err) => {
    console.log('Failed to synchronize database:', err);
  });

// Define routes
app.use('/api/auth', require('./routes/auth.routes')); // Ensure auth.routes exports a router
app.use('/api/dining', require('./routes/dining.routes')); // Ensure dining.routes exports a router
// app.use('/api/reservation', require('./routes/reservation.routes')); // Uncomment if reservation.routes is correctly defined

// Set Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
