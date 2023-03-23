const express = require("express");
const exhbs = require("express-handlebars");
const bodyParser = require("body-parser");
const { extname } = require("path");
const port = 8099;
const app = express();
let data = require("./data");
let pass, email;

app.use(bodyParser.urlencoded({ extended: true }));

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

app.get("/", (req, res) => {
  res.render("login", { layout: "main", email: null, pass: null });
});

app.post("/login", (req, res) => {
  pass = req.body.pass;
  email = req.body.email;
  if (data.checkUser(email, pass)) res.redirect("/home");
  else res.render("login", { layout: "main", email, pass });
});
app.post("/signup", (req, res) => {
  let email = req.body.email;
  let pass = req.body.pass;
  let repass = req.body.repass;
  let fullName = req.body.fullName;
  if (pass != repass || !data.register(fullName, email, pass))
    res.render("signup", { layout: "main", fullName, email, pass });
  else res.render("login", { layout: "main", email, pass });
});

app.get("/home/:page", (req, res) => {
  let page = req.params.page;
  res.render(page, { layout: false });
});

app.get("/home", (req, res) => {
  res.render("product");
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log("Run Port : " + port);
});
