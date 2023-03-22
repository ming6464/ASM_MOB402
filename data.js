class Account {
  constructor(email, pass, firstName, lastName) {
    this.email = email;
    this.pass = pass;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

let accounts = [
  new Account("minh1@gmail.com", "1", "Nguyen", "Minh1"),
  new Account("minh2@gmail.com", "2", "Nguyen", "Minh2"),
  new Account("minh3@gmail.com", "3", "Nguyen", "Minh3"),
  new Account("minh4@gmail.com", "4", "Nguyen", "Minh4"),
];

function getIndex(email = "") {
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].email == email) return i;
  }
  return -1;
}

exports.checkAccount = (email = "", pass = "") => {
  let index = getIndex(email);
  if (index == -1 || accounts[index].pass != pass) return false;
  return true;
};

exports.register = (email = "", pass = "", firstName = "", lastName = "") => {
  if (
    email.length == 0 ||
    pass.length == 0 ||
    firstName.length == 0 ||
    lastName.length == 0 ||
    getIndex(email) != -1
  )
    return false;
  accounts.push(new Account(email, pass, firstName, lastName));
  return true;
};
