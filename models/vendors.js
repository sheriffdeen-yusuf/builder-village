export default (sequelize, DataTypes) => {
  const vendors = sequelize.define("vendors", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account_type: {
      type: DataTypes.STRING,
    },
    fullname: {
      type: DataTypes.STRING,
    },
    company_name: {
      type: DataTypes.STRING,
      defaultValue: "No Company",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nin: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    ip_address: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lga: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
  });
  return vendors;
};
