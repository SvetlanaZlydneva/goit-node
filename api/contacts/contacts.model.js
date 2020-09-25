const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: String, require: true },
});

mongoose.set("useFindAndModify", false);

//contatcts
module.exports = mongoose.model("Contact", contactSchema);
