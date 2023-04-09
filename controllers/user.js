const User = require("./../models/user");
const { validateBody, schemas } = require("./../helpers/routerHelper");
const getAllUser = async (req, res, next) => {
   console.log("---getAllUser");
   const users = await User.find({}).lean().exec();
   res.render("user", { users, layout: false });
};
const getUser = async (req, res, next) => {
   console.log("---getUser");
};
const createUser = async (req, res, next) => {
   console.log("----++createUser");
   const obj = req.body;
   let newObj = new User({
      fullName: obj.fullName,
      email: obj.email,
      password: obj.password,
   });
   await newObj.save().catch(console.log("lỗi"));
   next();
};
const deleteUser = async (req, res, next) => {
   console.log("-----deleteUser");
   const id = req.params.id;
   await User.deleteOne({ _id: id }).then(res.send("oke"));
};

const searchUser = async (req, res, next) => {
   const value = req.params.value.toLocaleLowerCase();
   const list = await User.find({}).lean().exec();
   let users = [];
   list.forEach((e) => {
      if (e.email.toLocaleLowerCase().includes(value)) {
         users.push(e);
      }
   });
   res.render("user", { users, layout: false });
};

const updateUser = async (req, res, next) => {
   console.log("------updateUser");
   const obj = req.body;
   if (!validateBody(schemas.userSchema, obj)) console.log("lỗi");
   else {
      const id = req.params.id;
      await User.updateOne({ _id: id }, obj);
      res.send("hello");
   }
};
const signUp = async (req, res, next) => {
   console.log("-------signUp{User}");
   const { fullName, email, password, password1 } = req.body;
   let check = true;
   let log = "";
   if (
      fullName.length == 0 ||
      email.length == 0 ||
      password.length == 0 ||
      password1.length == 0
   ) {
      log = "trống";
      check = false;
   } else if (password != password1) {
      log = "sai pass";
      check = false;
   }
   let tk = await User.findOne({ email: email }).lean().exec();
   if (tk) {
      log = "tài khoản đã tồn tại";
      check = false;
   }

   if (!check) {
      console.log(log, fullName, email, password, password1);
      return res.redirect("/signup");
   }

   let newUser = new User({
      fullName: fullName,
      email: email,
      password: password,
   });
   // save the user
   await newUser.save();
   console.log(newUser);
   res.redirect("/");
};

const signIn = async (req, res, next) => {
   console.log("-------signIn{User}");
   const { email, password } = req.body;
   const user = await User.findOne({ email: email, password: password });
   if (!user) {
      res.redirect("/");
      return;
   }
   res.redirect("/home");
};
module.exports = {
   getAllUser,
   createUser,
   deleteUser,
   updateUser,
   getUser,
   signUp,
   signIn,
   searchUser,
};
