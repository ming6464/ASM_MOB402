const signIn = (req, res, next) => {
   console.log("----signIn {api}");
   res.render("signin", { layout: "main" });
};

const signUp = (req, res, next) => {
   console.log("----signUp {api}");
};

const Home = (req, res, next) => {
   res.render("product");
};

module.exports = {
   signIn,
   signUp,
   Home,
};
