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
});

userSchema.static("updateToken", async function (id, newToken) {
  return this.findByIdAndUpdate(id, {
    token: newToken,
  });
});

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

//users
module.exports = mongoose.model("User", userSchema);
