module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    timestamps: true, // Enables createdAt and updatedAt
    createdAt: 'created_at', // Custom column name for createdAt
    updatedAt: 'updated_at', // Custom column name for updatedAt
  });

  Reservation.associate = (models) => {
    Reservation.belongsTo(models.User, { foreignKey: 'userId' });
    Reservation.belongsTo(models.Dining, { foreignKey: 'diningId' });
  };

  return Reservation;
};
