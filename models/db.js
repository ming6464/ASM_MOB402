const mongoose = require("mongoose");

mongoose
   .connect(
      "mongodb+srv://giaminh16092003:7rN6UlGBcmZm2Czu@mongotest.hdbc0el.mongodb.net/AsmMOB402?retryWrites=true&w=majority"
   )
   .then(() => console.log("✅ Connected database from mongodb."))
   .catch((error) =>
      console.error(
         `❌ Connect database is failed with error which is ${error}`
      )
   );
module.exports = { mongoose };
