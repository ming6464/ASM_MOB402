const express = require("express");
const exhbs = require("express-handlebars");
const bodyParser = require("body-parser");
const port = 8099;
const app = express();
const User = require("./User");
const Product = require("./Product");

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
app.listen(port, (err) => {
  if (err) throw err;
  console.log("Run Port : " + port);
});
app.get("/", (req, res) => {
  res.render("login", { layout: "main", email: null, pass: null });
});

app.post("/login", (req, res) => {
  pass = req.body.pass;
  email = req.body.email;
  if (checkUser(email, pass)) res.redirect("/home");
  else res.render("login", { layout: "main", email, pass });
});
app.post("/signup", (req, res) => {
  let email = req.body.email;
  let pass = req.body.pass;
  let repass = req.body.repass;
  let fullName = req.body.fullName;
  let id = Math.floor(Math.random() * 100).toString();
  if (pass != repass || !register(id, fullName, email, pass))
    res.render("signup", { layout: "main", fullName, email, pass });
  else res.render("login", { layout: "main", email, pass });
});

app.get("/home/:page", (req, res) => {
  res.render(req.params.page, { layout: false });
});

app.get("/home", (req, res) => {
  res.render("product");
});

app.get("/get/:field", (req, res) => {
  let field = req.params.field;
  switch (field) {
    case "product":
      res.json(products);
      break;
    case "user":
      res.json(users);
      break;
  }
});

app.delete("/home/:field/:id", (req, res) => {
  let id = req.params.id;
  if (req.params.field == "user") {
    let index = users.findIndex((e) => e.id == id);
    if (index == -1) {
      res.send("false");
      return;
    }
    users.splice(index, 1);
    res.send("true");
    return;
  }
  let index = products.findIndex((e) => e.id == id);
  if (index == -1) {
    res.send("false");
    return;
  }
  products.splice(index, 1);
  res.send("true");
});

///list Data
let users = [
  new User("1", "Nguyễn Gia Minh", "minh1@gmail.com", "1"),
  new User("9", "Nguyễn Văn Toàn", "minh2@gmail.com", "2"),
  new User("2", "Dương Cử Tâm", "minh3@gmail.com", "3"),
  new User("3", "Minhg kak a", "minh12@gmail.com", "minh12@gmail.com"),
];

let products = [
  new Product(
    "1",
    "Galaxy S21 FE 5G (6GB/128GB)",
    "10990000.0",
    "ảnh",
    "yellow",
    "Điện thoại"
  ),
  new Product(
    "2",
    "OPPO Reno8 T 5G 256GB",
    "10990000.0",
    "ảnh",
    "yellow",
    "Điện thoại"
  ),
  new Product(
    "3",
    "Xiaomi Redmi 12C 128GB",
    "10990000.0",
    "ảnh",
    "yellow",
    "Điện thoại"
  ),
  new Product(
    "4",
    "Samsung Galaxy A34 5G 256GB",
    "10990000.0",
    "ảnh",
    "yellow",
    "Điện thoại"
  ),
  new Product(
    "5",
    "Realme C55 6GB",
    "10990000.0",
    "ảnh",
    "yellow",
    "Điện thoại"
  ),
  new Product(
    "6",
    "Vivo Y02s 32GB",
    "10990000.0",
    "ảnh",
    "yellow",
    "Điện thoại"
  ),
  new Product(
    "7",
    "Lenovo Ideapad 3",
    "10990000.0",
    "ảnh",
    "yellow",
    "Laptop Gamming"
  ),
];
function getIndex(email = "") {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email) return i;
  }
  return -1;
}

function checkUser(email = "", pass = "") {
  let index = getIndex(email);
  if (index == -1 || users[index].passwork != pass) return false;
  return true;
}

function register(id = "", fullname = "", email = "", pass = "") {
  if (
    email.length == 0 ||
    pass.length == 0 ||
    fullname.length == 0 ||
    getIndex(email) != -1
  )
    return false;
  users.push(new User(id, fullname, email, pass));
  return true;
}
///
