const Product = require("../models/product");
const HttpError = require("../util/HttpError");

const createProduct = async (req, res, next) => {
  const { name, description, price } = req.body;

  let createdProduct;
  try {
    createdProduct = await Product.create({
      name,
      description,
      price,
    });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
  res.status(201).json(createdProduct);
};

const getProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.findAll();
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
  res.status(200).json(products);
};

const getProductById = async (req, res, next) => {
  let product;

  try {
    product = await Product.findOne({ where: { id: req.params.id } });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
  res.status(200).json(product);
};

const updateProductById = async (req, res, next) => {};

const deleteProductById = async (req, res, next) => {};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.updateProductById = updateProductById;
exports.deleteProductById = deleteProductById;
