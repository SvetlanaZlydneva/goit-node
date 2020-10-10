const AvatarGenerator = require("avatar-generator");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { promises: fsPromises } = require("fs");
const {
  imageUrl,
  tmpPath,
  imagesPath,
  avatarImgPath,
} = require("../api/config");

const avatarService = async () => {
  const avatar = new AvatarGenerator({
    parts: ["background", "face", "clothes", "head", "hair", "eye", "mouth"],
    partsLocation: path.join(__dirname, avatarImgPath),
    imageExtension: ".png",
  });
  const variant = "female";
  const name = `${uuidv4()}.png`;
  const image = await avatar.generate(name, variant);
  await image.png().toFile(path.join(__dirname, tmpPath(name)));
  await moveFile(name);
  return imageUrl(name);
};

const moveFile = async (name) => {
  await fsPromises.copyFile(
    path.join(__dirname, tmpPath(name)),
    path.join(__dirname, imagesPath(name))
  );
  await fsPromises.unlink(path.join(__dirname, tmpPath(name)));
};

module.exports = {
  avatarService,
};
