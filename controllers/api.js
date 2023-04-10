const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { JWT_SCERET } = require("../configs/index");
const signIn = (req, res, next) => {
   console.log("----signIn {api}");
   res.render("signin", { layout: "main" });
};

const signUp = (req, res, next) => {
   res.render("signup", { layout: "main" });
};

const Home = async (req, res, next) => {
   let token = req.cookies.token_402;
   let check = true;
   if (!token) {
      check = false;
   } else {
      try {
         let data = jwt.verify(token, JWT_SCERET);
         let obj = await User.findById(data.id);
         if (!obj) check = false;
         console.log("obj token", obj);
      } catch (error) {
         check = false;
      }
   }
   if (!check) res.redirect("/signin");
   else res.render("product");
};
module.exports = {
   signIn,
   signUp,
   Home,
};
