// models/BookedSlot.model.js
module.exports = (sequelize, DataTypes) => {
  const BookedSlot = sequelize.define('BookedSlot', {
    dining_place_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'dining_places',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'booked_slots',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return BookedSlot;
};
