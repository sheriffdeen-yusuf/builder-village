export default (sequelize, DataTypes) => {
  const userLogin = sequelize.define("user_Login", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account_type: {
      type: DataTypes.STRING,
    },
  });

  return userLogin;
};
