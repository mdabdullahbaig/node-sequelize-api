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

const updateProductById = async (req, res, next) => {
  let updatedProduct;

  try {
    updatedProduct = await Product.findOne({ where: { id: req.params.id } });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  if (!updatedProduct) {
    const error = new HttpError("Product with this id does not exists.", 500);
    return next(error);
  }

  const { name, description, price } = req.body;

  updatedProduct.name = name;
  updatedProduct.description = description;
  updatedProduct.price = price;

  try {
    await updatedProduct.save();
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  res.status(200).json(updatedProduct);
};

const deleteProductById = async (req, res, next) => {
  let deletedProduct;

  try {
    deletedProduct = await Product.findOne({ where: { id: req.params.id } });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  if (!deletedProduct) {
    const error = new HttpError("Product with this id does not exists.", 500);
    return next(error);
  }

  try {
    await deletedProduct.destroy();
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  res.status(200).json({ message: "Product has been deleted." });
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.updateProductById = updateProductById;
exports.deleteProductById = deleteProductById;
