const { Router } = require("express");
const { getCurrentUser, updateSubscription } = require("./users.controller");
const {
  tokenVerification,
  validateId,
  validateSubscription,
} = require("./users.middleware");
const usersRouter = Router();

usersRouter.get("/current", tokenVerification, getCurrentUser);
usersRouter.patch("/:id", validateId, validateSubscription, updateSubscription);

module.exports = usersRouter;
