import express from "express";
import bcrypt from "bcrypt";
import {
  createUser,
  getUserByMail,
  createStatus,
  getStatus,
} from "../amazonhelper.js";
import { genPassword } from "../index.js";

const router = express.Router();

// Amazon Signup
router.route("/signup").post(async (request, response) => {
  const { email, password } = request.body;
  const userFromDB = await getUserByMail(email);
  if (userFromDB) {
    response.status(400).send({ message: "Email already registered" });
    return;
  }

  if (password.length < 8) {
    response.status(400).send({ message: "Password must be longer" });
    return;
  }

  const hashedPassword = await genPassword(password);
  const result = await createUser({
    email,
    password: hashedPassword,
  });
  response.send(result);
});

// Amazon Login
router.route("/login").post(async (request, response) => {
  const { email, password } = request.body;
  const userFromDB = await getUserByMail(email);
  if (!userFromDB) {
    response.status(400).send({ message: "Invalid Credentials" });
    return;
  }

  if (password.length < 8) {
    response.status(401).send({ message: "Password must be longer" });
    return;
  }

  const storedPassword = userFromDB.password;
  const isPasswordMatch = await bcrypt.compare(password, storedPassword);
  if (isPasswordMatch) {
    const result = await createStatus({
      email: email,
      current_status: "success",
    });
    response.send({ message: "Login Successful", result });
  } else {
    response.status(401).send({ message: "Invalid Credentials" });
  }
});

// Login status
router.route("/loginstatus").get(async (request, response) => {
  const user = await getStatus();
  response.send({ user });
});

// Amazon Logout

export const amazonRouter = router;
