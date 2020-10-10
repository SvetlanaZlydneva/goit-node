const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const allowedExtensions = [".png", ".jpg"];

const avatarUploader = () => {
  const storage = multer.diskStorage({
    destination: "tmp",
    filename: function (req, file, cb) {
      const fileExtension = path.parse(file.originalname).ext;
      if (!allowedExtensions.includes(fileExtension))
        return cb(new Error("Invalid file extension").message);
      cb(null, uuidv4() + fileExtension);
    },
  });
  return multer({ storage }).single("avatars");
};

module.exports = {
  multerService: avatarUploader(),
};
