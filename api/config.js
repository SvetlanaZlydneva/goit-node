require("dotenv").config();
const path = require("path");
const {
  HOST,
  PORT,
  IMAGE_DIRECTORY,
  MONGODB_URL,
  PUBLIC_DIRECTORY,
  TMP_DIRECTORY,
  SENDGRID_API_KEY,
  SENDER_EMAIL,
} = process.env;

const paths = {
  host: HOST || "http://localhost",
  port: PORT || 3000,
  db:
    MONGODB_URL ||
    "mongodb+srv://goit:parabolika@db-contacts.i4ehu.mongodb.net/db-contacts?retryWrites=true&w=majority",
  public: PUBLIC_DIRECTORY || "public",
  tmp: TMP_DIRECTORY || "tmp",
  images: IMAGE_DIRECTORY || "images",
  avatarGeneratorImg: "../node_modules/avatar-generator/img",
};

const mail = {
  sendGrigApiKey:
    SENDGRID_API_KEY ||
    "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",
  senderEmail: SENDER_EMAIL || "developer.zsa@gmail.com",
  verifyLink: `${paths.host}:${paths.port}/api/auth/verify/`,
};

const imageUrl = (imgName) => {
  return `${paths.host}:${paths.port}/${paths.images}/${imgName}`;
};

const tmpPath = (imgName) => {
  return path.join("..", paths.tmp, imgName);
};

const imagesPath = (imgName) => {
  return path.join("..", paths.public, paths.images, imgName);
};

const minifiedDir = () => {
  return path.join(paths.public, paths.images);
};

module.exports = {
  imageUrl,
  tmpPath,
  tmpDir: paths.tmp,
  imagesPath,
  avatarImgPath: paths.avatarGeneratorImg,
  minifiedDir,
  port: paths.port,
  db: paths.db,
  emailApi: mail.sendGrigApiKey,
  sender: mail.senderEmail,
  link: mail.verifyLink,
};
