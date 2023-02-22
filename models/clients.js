export default (sequelize, DataTypes) => {
  const clients = sequelize.define("clients", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      defaultValue: "not disclose",
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resetLink: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
  });

  return clients;
};
