export default (sequelize, DataTypes) => {
  const admins = sequelize.define(
    "admin",
    {
      username: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.TEXT,
      },
      verify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      password: {
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      refreshToken: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );

  return admins;
};
