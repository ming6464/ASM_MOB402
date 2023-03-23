const User = require("./User");

let Users = [
  new User("Nguyễn Gia Minh", "minh1@gmail.com", "1"),
  new User("Nguyễn Văn Toàn", "minh2@gmail.com", "2"),
  new User("Dương Cử Tâm", "minh3@gmail.com", "3"),
];

function getIndex(email = "") {
  for (let i = 0; i < Users.length; i++) {
    if (Users[i].email == email) return i;
  }
  return -1;
}

exports.checkUser = (email = "", pass = "") => {
  let index = getIndex(email);
  if (index == -1 || Users[index].passwork != pass) return false;
  return true;
};

exports.register = (fullname = "", email = "", pass = "") => {
  if (
    email.length == 0 ||
    pass.length == 0 ||
    fullname.length == 0 ||
    getIndex(email) != -1
  )
    return false;
  Users.push(new User(fullname, email, pass));
  return true;
};
