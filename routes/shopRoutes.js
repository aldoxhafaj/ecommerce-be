const express = require("express");

const router = express.Router();

const productsController = require("../controllers/product");

router.get("/products", productsController.getProducts);

module.exports = router;
