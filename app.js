const express = require("express");
const cors = require("cors");
const HttpError = require("./util/HttpError");
const productRoute = require("./routes/product-route");
const db = require("./config/database");

const app = express();

const PORT = process.env.PORT || 3000;

// It parses incoming requests with JSON payloads, urlencoded payloads and is based on body-parser.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/products", productRoute);

app.use((req, res, next) => {
  const error = new HttpError("Something went wrong.", 500);
  return next(error);
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

db.sync()
  .then(() => {
    console.log("Database Connected!!!");
    app.listen(PORT);
    console.log(`Server is running on ${PORT}`);
  })
  .catch((err) => console.log(err));
