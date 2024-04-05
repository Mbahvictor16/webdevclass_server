const Users = require("../model/db");
function validateUser({ firstName, lastName, userName, email, password }) {
  if (firstName === undefined || firstName.trim() === "") {
    return {
      response: null,
      err: true,
      errMsg: "Invalid input field",
    };
  }

  if (lastName === undefined || lastName.trim() === "") {
    return {
      response: null,
      err: true,
      errMsg: "Invalid input field",
    };
  }

  if (userName === undefined || userName.trim() === "") {
    return {
      response: null,
      err: true,
      errMsg: "Invalid input field",
    };
  }

  if (email === undefined || email.trim() === "") {
    return {
      response: null,
      err: true,
      errMsg: "Invalid input field",
    };
  }

  if (password === undefined || password.trim() === "") {
    return {
      response: null,
      err: true,
      errMsg: "Invalid input field",
    };
  }

  if (password.length > 16 || password.length < 8) {
    return {
      response: null,
      err: true,
      errMsg:
        "Password must be at least 8 characters and not more than 16 characters",
    };
  }

  if (password.includes(" ")) {
    return {
      response: null,
      err: true,
      errMsg: "Password should not contain whitespace character",
    };
  }

  const emailRegex = /^[a-zA-Z0-9]{4,}@[a-z]{2,6}.[a-z]{2,4}$/;

  if (!emailRegex.test(email)) {
    return {
      response: null,
      err: true,
      errMsg: "Invaild email address",
    };
  }

  return {
    response: null,
    err: false,
    errMsg: null,
  };
}

async function CredentialExists(userName, email) {
  const findUser = await Users.findOne({
    $or: [
      { userName: userName.trim() },
      { email: email.toLowerCase().trim() },
    ],
  });

  if (findUser) {
    return {
      response: null,
      err: true,
      errMsg: "This user already exists",
    };
  }

  return {
    response: null,
    err: false,
    errMsg: null,
  };
}

module.exports = { validateUser, CredentialExists };
