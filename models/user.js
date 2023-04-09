var db = require("./db");
const schema = new db.mongoose.Schema({
   fullName: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
});
const User = db.mongoose.model("User", schema);
module.exports = User;
