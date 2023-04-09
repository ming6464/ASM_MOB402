const express = require("express");
const router = express.Router();
const productCtl = require("../controllers/product");

router.route("/").get(productCtl.getAllProduct);

router
   .route("/option/:id")
   .get(productCtl.getProduct)
   .post(productCtl.createProduct)
   .put(productCtl.updateProduct)
   .delete(productCtl.deleteProduct);

router.route("/search/:value").get(productCtl.searchProduct);

module.exports = router;
