const express = require("express");
const router = express.Router();
const userCtl = require("../controllers/user");

router.route("/").get(userCtl.getAllUser);

router
   .route("/option/:id")
   .get(userCtl.getUser)
   .post(userCtl.createUser)
   .put(userCtl.updateUser)
   .delete(userCtl.deleteUser);

router.route("/search/:value").get(userCtl.searchUser);

router.route("/signup").post(userCtl.signUp);
router.route("/signin").post(userCtl.signIn);

module.exports = router;
