const express = require("express");
const router = express.Router();
const apiCtrl = require("../controllers/api");

router.route("/").get(apiCtrl.signIn);
router.route("/signup").get(apiCtrl.signUp);
router.route("/home").get(apiCtrl.Home);
module.exports = router;
