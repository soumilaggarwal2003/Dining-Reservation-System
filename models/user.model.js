module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
    },
  }, {
    timestamps: true, // Enable automatic `created_at` and `updated_at`
    createdAt: 'created_at', // Custom column name for createdAt
    updatedAt: 'updated_at', // Custom column name for updatedAt
  });

  return User;
};
