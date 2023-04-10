const express = require("express");
const router = express.Router();
const apiCtrl = require("../controllers/api");

router.route("/").get(apiCtrl.Home);
router.route("/signup").get(apiCtrl.signUp);
router.route("/signin").get(apiCtrl.signIn);
module.exports = router;
