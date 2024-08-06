// const Sequelize = require('sequelize');
// const config = require('../config/db.config'); // Adjust path if needed

// const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
//   host: config.HOST,
//   dialect: config.dialect,
//   logging: false, // Change to true if you want to see SQL queries
// });

// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.User = require('./user.model')(sequelize, Sequelize);
// db.Dining = require('./dining.model')(sequelize, Sequelize);
// db.Reservation = require('./BookedSlot.model')(sequelize, Sequelize);

// // Sync the database schema with Sequelize models
// sequelize.sync({ alter: true }) // Use { force: true } with caution; it drops tables
//   .then(() => console.log('Database synchronized'))
//   .catch(err => console.error('Error synchronizing database:', err));

// module.exports = db;


// index.js
const Sequelize = require('sequelize');
const config = require('../config/db.config'); // Adjust path if needed

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model')(sequelize, Sequelize);
db.Dining = require('./dining.model')(sequelize, Sequelize);
db.BookedSlot = require('./BookedSlot.model')(sequelize, Sequelize); // Ensure this is correct

// Sync the database schema with Sequelize models
sequelize.sync({ alter: true })
  .then(() => console.log('Database synchronized successfully'))
  .catch(err => console.error('Error synchronizing database:', err));

module.exports = db;
