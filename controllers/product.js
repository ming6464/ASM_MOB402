const Product = require("../models/products");
const jwt = require("jsonwebtoken");
const getAllProduct = async (req, res, next) => {
   console.log("---getAllProduct");
   const products = await Product.find({}).lean().exec();
   res.render("product", { products, layout: false });
};

const getProduct = (req, res, next) => {
   console.log("---getProduct");
};

const createProduct = async (req, res, next) => {
   console.log("----createProduct");
   const obj = req.body;
   let newObj = new Product({
      name: obj.name,
      price: obj.price,
      image: "anh",
      color: obj.color,
      category: obj.category,
   });
   await newObj.save().catch(console.log("lỗi"));
   next();
};

const updateProduct = async (req, res, next) => {
   console.log("-----UpdateProduct");
   const obj = req.body;
   const id = req.params.id;
   await Product.updateOne({ _id: id }, obj);
   res.send("oke");
};

const deleteProduct = async (req, res, next) => {
   console.log("------deleteProduct");
   const id = req.params.id;
   await Product.deleteOne({ _id: id }).then(res.send("ok"));
};

const searchProduct = async (req, res, next) => {
   const value = req.params.value.toLocaleLowerCase();
   const list = await Product.find({});
   let list2 = [];
   list.forEach((e) => {
      if (e.name.toLocaleLowerCase().includes(value)) {
         list2.push(e);
      }
   });
   res.render("product", { products: list2, layout: false });
};

module.exports = {
   getAllProduct,
   getProduct,
   createProduct,
   updateProduct,
   deleteProduct,
   searchProduct,
};
