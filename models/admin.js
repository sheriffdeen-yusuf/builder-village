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
      password: {
        type: DataTypes.TEXT,
      },
    },
    { timestamps: false }
  );

  return admins;
};
