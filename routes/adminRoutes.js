const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");

const isAuth = require("../middleware/isAuth");

router.post("/addProduct", isAuth, adminController.postAddProduct);

module.exports = router;
