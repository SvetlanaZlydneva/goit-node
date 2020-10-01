const userModel = require("../users/users.model");
const {
  hashPassword,
  comparePassword,
} = require("../../services/hash.service");
const { createToken } = require("../../services/token.service");

class AuthController {
  async createUser(req, res, next) {
    try {
      if (req.user) return res.status(409).send({ message: "Email in use" });
      const { email, password, subscription } = req.body;
      const user = await userModel.create({
        email,
        password: await hashPassword(password),
        subscription,
      });
      return res.status(201).json({
        email: user.email,
        subscription: user.subscription,
      });
    } catch (err) {
      next(err);
    }
  }

  async signIn(req, res, next) {
    try {
      const { user, body } = req;
      if (!user)
        return res.status(401).send({ message: "Email or Password is wrong" });
      if (!(await comparePassword(body.password, user.password)))
        return res.status(401).send({ message: "Email or Password is wrong" });
      const { _id, email, subscription } = user;
      const token = await createToken({ id: _id });
      await userModel.updateToken(_id, token);
      return res.status(200).json({
        token,
        email,
        subscription,
      });
    } catch (err) {
      next(err);
    }
  }

  async logOut(req, res, next) {
    try {
      const { _id } = req.user;
      await userModel.updateToken(_id, null);
      return res.status(204).send({ message: "No Content" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
