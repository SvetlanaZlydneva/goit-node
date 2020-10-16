const { Router } = require("express");
const {
  createUser,
  signIn,
  logOut,
  verifyEmail,
} = require("./auth.controller");
const { findUserByEmail } = require("../users/users.controller");
const {
  tokenVerification,
  validateUser,
} = require("../users/users.middleware");
const authRouter = Router();

authRouter.get("/verify/:verificationToken", verifyEmail);
authRouter.post("/register", validateUser, findUserByEmail, createUser);
authRouter.post("/login", validateUser, findUserByEmail, signIn);
authRouter.post("/logout", tokenVerification, logOut);

module.exports = authRouter;
