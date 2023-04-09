var db = require("./db");
const schema = new db.mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      required: true,
   },
   image: {
      type: String,
   },
   color: {
      type: String,
      required: true,
   },
   category: {
      type: String,
   },
});
const Product = db.mongoose.model("Product", schema);
module.exports = Product;
