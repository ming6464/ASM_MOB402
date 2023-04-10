const express = require("express");
const exhbs = require("express-handlebars");
const bodyParser = require("body-parser");
const port = 8099;
const app = express();
const userRouter = require("./routers/user");
const apiRouter = require("./routers/api");
const productRouter = require("./routers/product");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine(
   "hbs",
   exhbs.engine({
      extname: ".hbs",
      defaultLayout: "main2",
      layoutsDir: "./views/layouts",
   })
);
app.set("views", "./views");
app.set("view engine", "hbs");
app.listen(port, (err) => {
   if (err) throw err;
   console.log("Run Port : " + port);
});
app.use("/", apiRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);

// app.post("/login", (req, res) => {
//    pass = req.body.pass;
//    email = req.body.email;
//    if (checkUser(email, pass)) res.redirect("/home");
//    else res.render("login", { layout: "main", email, pass });
// });
// app.post("/signup", (req, res) => {
//    let email = req.body.email;
//    let pass = req.body.pass;
//    let repass = req.body.repass;
//    let fullName = req.body.fullName;
//    let id = Math.floor(Math.random() * 100).toString();
//    if (pass != repass || !register(id, fullName, email, pass))
//       res.render("signup", { layout: "main", fullName, email, pass });
//    else res.render("login", { layout: "main", email, pass });
// });

// app.get("/home/:page", (req, res) => {
//    res.render(req.params.page, { layout: false });
// });

// app.get("/home", (req, res) => {
//    res.render("product");
// });

// app.get("/get/:field", (req, res) => {
//    let field = req.params.field;
//    switch (field) {
//       case "product":
//          res.json(products);
//          break;
//       case "user":
//          res.json(users);
//          break;
//    }
// });

// app.delete("/home/:field/:id", (req, res) => {
//    let id = req.params.id;
//    if (req.params.field == "user") {
//       let index = users.findIndex((e) => e.id == id);
//       if (index == -1) {
//          res.send("false");
//          return;
//       }
//       users.splice(index, 1);
//       res.send("true");
//       return;
//    }
//    let index = products.findIndex((e) => e.id == id);
//    if (index == -1) {
//       res.send("false");
//       return;
//    }
//    products.splice(index, 1);
//    res.send("true");
// });

// app.get("/search/:field/:value", (req, res) => {
//    let value = req.params.value;
//    value = value.toUpperCase();
//    let list = [];
//    if (req.params.field == "user") {
//       for (let i = 0; i < users.length; i++) {
//          if (users[i].email.toUpperCase().includes(value)) list.push(users[i]);
//       }
//    } else {
//       for (let i = 0; i < products.length; i++) {
//          if (products[i].name.toUpperCase().includes(value))
//             list.push(products[i]);
//       }
//    }
//    res.json(list);
// });

// app.post("/add/:field", (req, res) => {
//    const obj = req.body;
//    const field = req.params.field;
//    let check = false;
//    if (field == "product") {
//       products.push(
//          new Product(
//             obj.id,
//             obj.name,
//             obj.price,
//             obj.category,
//             obj.color,
//             obj.image
//          )
//       );
//       check = true;
//    } else if (getUserIndex(obj.email) == -1) {
//       check = true;
//       users.push(new User(obj.id, obj.fullName, obj.email, obj.passwork));
//    } else check = false;
//    res.send(check);
// });

// app.post("/edit/:field", (req, res) => {
//    const obj = req.body;
//    const field = req.params.field;
//    let check = true,
//       index = -1;
//    if (field == "user") {
//       index = users.findIndex((e) => e.id == obj.id);
//       if (index == -1) check = false;
//       else users[index] = obj;
//    } else {
//       index = products.findIndex((e) => e.id == obj.id);
//       if (index == -1) check = false;
//       else products[index] = obj;
//    }
//    res.send(check);
// });

// function register(id = "", fullname = "", email = "", pass = "") {
//    if (
//       email.length == 0 ||
//       pass.length == 0 ||
//       fullname.length == 0 ||
//       getUserIndex(email) != -1
//    )
//       return false;
//    users.push(new User(id, fullname, email, pass));
//    return true;
// }
