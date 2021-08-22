const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Product = db.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.DOUBLE,
  },
});

(async () => {
  await Product.sync();
})();

module.exports = Product;
