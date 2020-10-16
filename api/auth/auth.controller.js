const userModel = require("../users/users.model");
const {
  hashPassword,
  comparePassword,
} = require("../../services/hash.service");
const { createToken } = require("../../services/token.service");
const { avatarService } = require("../../services/avatargenerator.service");
const { sendMail } = require("../../services/sendmail.service");
const { v4: uuidv4 } = require("uuid");

class AuthController {
  get createUser() {
    return this._createUser.bind(this);
  }

  async _createUser(req, res, next) {
    try {
      if (req.user) return res.status(409).send({ message: "Email in use" });
      const { email, password, subscription } = req.body;
      const user = await userModel.create({
        email,
        password: await hashPassword(password),
        subscription,
        avatarURL: await avatarService(),
      });
      await this.sendVerificationEmail(user);
      return res.status(201).json({
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
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
      if (user.status !== "Verified")
        return res.status(401).send({ message: "Your mail is not verified" });
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

  async verifyEmail(req, res, next) {
    try {
      const { verificationToken } = req.params;
      const user = await userModel.findByVerificationToken(verificationToken);
      if (!user) return res.status(404).send({ message: "User not found" });
      await userModel.verifyUser(user._id);
      return res
        .status(200)
        .send({ message: "You're email successfully verified" });
    } catch (err) {
      next(err);
    }
  }

  async sendVerificationEmail(user) {
    const verificationToken = uuidv4();
    await userModel.createVerificationToken(user._id, verificationToken);
    await sendMail(user.email, verificationToken);
  }
}

module.exports = new AuthController();
