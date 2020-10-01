const userModel = require("./users.model");

class UserController {
  async findUserByEmail(req, _, next) {
    try {
      const { email } = req.body;
      const user = await userModel.findOne({ email });
      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  }

  async getCurrentUser(req, res) {
    const { email, subscription } = req.user;
    return res.status(200).json({
      email,
      subscription,
    });
  }

  async updateSubscription(req, res, next) {
    try {
      const { subscription } = req.body;
      const user = await userModel.findByIdAndUpdate(
        req.id,
        {
          subscription,
        },
        { new: true }
      );
      if (!user) return res.status(404).send({ message: "Not found" });
      return res.status(200).json({
        email: user.email,
        subscription: user.subscription,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();