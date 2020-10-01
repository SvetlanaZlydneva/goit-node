const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const contactSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: String, require: true },
});

mongoose.set("useFindAndModify", false);
contactSchema.plugin(mongoosePaginate);

//contatcts
module.exports = mongoose.model("Contact", contactSchema);
