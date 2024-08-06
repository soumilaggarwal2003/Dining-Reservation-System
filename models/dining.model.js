module.exports = (sequelize, DataTypes) => {
  const Dining = sequelize.define('Dining', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: { // Changed from 'location' to 'address' to match SQL schema
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
    },
    open_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    close_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  }, {
    tableName: 'dining_places',
    timestamps: true, // Enables createdAt and updatedAt
    createdAt: 'created_at', // Custom column name for createdAt
    updatedAt: 'updated_at', // Custom column name for updatedAt
  });

  return Dining;
};
