const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  avatarURL: { type: String },
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: { type: String },
  status: {
    type: String,
    require: true,
    enum: ["Verified", "Created"],
    default: "Created",
  },
  verificationToken: { type: String },
});

userSchema.static("updateToken", async function (id, newToken) {
  return this.findByIdAndUpdate(id, {
    token: newToken,
  });
});

userSchema.static("createVerificationToken", async function (id, token) {
  return this.findByIdAndUpdate(
    id,
    {
      verificationToken: token,
    },
    { new: true }
  );
});

userSchema.static("findByVerificationToken", async function (
  verificationToken
) {
  return this.findOne({ verificationToken });
});

userSchema.static("verifyUser", async function (id) {
  return this.findByIdAndUpdate(
    id,
    {
      status: "Verified",
      verificationToken: null,
    },
    { new: true }
  );
});

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

//users
module.exports = mongoose.model("User", userSchema);
