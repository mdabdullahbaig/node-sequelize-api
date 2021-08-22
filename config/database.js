const { Sequelize } = require("sequelize");
const { databaseInfo } = require("./dev");

const sequelize = new Sequelize(
  databaseInfo.db_name,
  databaseInfo.db_username,
  databaseInfo.db_password,
  {
    host: databaseInfo.host,
    dialect: databaseInfo.db_dialect,
  }
);

module.exports = sequelize;
