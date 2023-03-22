const express = require("express");
const exhbs = require("express-handlebars");
const bodyParser = require("body-parser");
const { extname } = require("path");
const port = 8099;
const app = express();
let isShowHeader = false;
let data = require("./data");
let pass, email;

app.use(bodyParser.urlencoded({ extended: true }));

app.engine(
  "hbs",
  exhbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: "./views/layouts",
  })
);
app.set("views", "./views");
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  //res.redirect("/home");
  res.render("login", { email: null, pass: null });
});

app.post("/login", (req, res) => {
  isShowHeader = false;
  pass = req.body.pass;
  email = req.body.email;
  if (data.checkAccount(email, pass)) res.redirect("/home");
  else res.render("login", { email, pass });
});
app.post("/signup", (req, res) => {
  let email = req.body.email;
  let pass = req.body.pass;
  let repass = req.body.repass;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  if (pass != repass || !data.register(email, pass, firstName, lastName))
    res.render("signup", { email, pass, firstName, lastName });
  else res.render("login", { email, pass });
});
app.get("/home", (req, res) => {
  isShowHeader = true;
  res.render("home", { isShowHeader });
});
app.listen(port, (err) => {
  if (err) throw err;
  console.log("Run Port : " + port);
});
