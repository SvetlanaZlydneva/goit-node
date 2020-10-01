const userModel = require("./users.model");
const Joi = require("joi");
const {
  Types: { ObjectId },
} = require("mongoose");
const { verifyToken } = require("../../services/token.service");

class UserMiddleware {
  async tokenVerification(req, res, next) {
    try {
      const token = req.get("Authorization") || "";
      if (!token) return res.status(401).send({ message: "Not authorized" });
      const { id } = await verifyToken(token);
      const user = await userModel.findById(id);
      if (!user || user.token !== token)
        return res.status(401).send({ message: "Not authorized" });
      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  }

  validateId(req, res, next) {
    const { id } = req.params;
    if (!ObjectId.isValid(id))
      return res.status(404).send({ message: "Not valid ID" });
    req.id = id;
    next();
  }

  validateUser(req, res, next) {
    const rules = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ru", "ua"] },
        })
        .required(),
      password: Joi.string().required(),
      subscription: Joi.string().valid("free", "pro", "premium"),
    });
    const result = rules.validate({ ...req.body });
    if (result.error) {
      return res.status(400).send({ message: result.error.message });
    }
    next();
  }

  validateSubscription(req, res, next) {
    const rules = Joi.object({
      subscription: Joi.string().required().valid("free", "pro", "premium"),
    });
    const result = rules.validate({ ...req.body });
    if (result.error) {
      return res.status(400).send({ message: result.error.message });
    }
    next();
  }
}
module.exports = new UserMiddleware();
