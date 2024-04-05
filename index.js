const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Users = require("./model/db");
const {
  validateUser,
  CredentialExists,
} = require("./validateUser/validateUser");

const app = express();

mongoose
  .connect(
    "mongodb+srv://mbahvictor16:E61eFbsD3JefwizQ@webdevusers.g0hwey2.mongodb.net/?retryWrites=true&w=majority&appName=webdevusers"
  )
  .then((logged) => console.log("connected"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/users/register", async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;

  const isValid = validateUser({
    firstName,
    lastName,
    userName,
    email,
    password,
  });

  const isExists = await CredentialExists(userName, email);

  if (isExists.err) {
    return res.status(404).json(isExists);
  }

  if (isValid.err) {
    return res.status(200).json(isValid);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await Users.create({
    firstName,
    lastName,
    userName: userName.trim(),
    email: email.toLowerCase().trim(),
    password: hashedPassword,
  });

  await newUser.save();
  return res.status(200).json({ response: newUser, err: false, errMsg: null });
});

app.post("/api/users/login", async (req, res) => {
  const { userNameorEmail, password } = req.body;

  if (userNameorEmail == undefined) {
    return res.status(404).json({
      response: null,
      err: true,
      errMsg: "Invalid input field",
    });
  }

  const findUser = await Users.findOne({
    $or: [
      { userName: userNameorEmail.trim() },
      { email: userNameorEmail.toLowerCase().trim() },
    ],
  });

  if (!findUser) {
    return res.status(404).json({
      response: null,
      err: true,
      errMsg: "This user does not exist",
    });
  }

  const comparePassword = await bcrypt.compare(password, findUser.password);

  if (!comparePassword) {
    return res.status(200).json({
      response: null,
      err: true,
      errMsg: "Password is incorrect",
    });
  }

  res.status(200).json({
    response: {
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      userName: findUser.userName,
      email: findUser.email,
      id: findUser._id,
    },
    err: false,
    errMsg: null,
  });
});

app.listen(3000);
