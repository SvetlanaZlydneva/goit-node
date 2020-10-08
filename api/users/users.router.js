const { Router } = require("express");
const {
  getCurrentUser,
  updateSubscription,
  updateAvatar,
} = require("./users.controller");
const {
  tokenVerification,
  validateId,
  validateSubscription,
} = require("./users.middleware");

const { multerService } = require("../../services/multer.service");
const { imageMinService } = require("../../services/imagemin.service");
const usersRouter = Router();

usersRouter.get("/current", tokenVerification, getCurrentUser);
usersRouter.patch(
  "/avatars",
  tokenVerification,
  multerService,
  imageMinService,
  updateAvatar
);
usersRouter.patch("/:id", validateId, validateSubscription, updateSubscription);

module.exports = usersRouter;
