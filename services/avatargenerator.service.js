const AvatarGenerator = require("avatar-generator");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { promises: fsPromises } = require("fs");

const avatarService = async () => {
  const avatar = new AvatarGenerator({
    parts: ["background", "face", "clothes", "head", "hair", "eye", "mouth"],
    partsLocation: path.join(__dirname, "../node_modules/avatar-generator/img"),
    imageExtension: ".png",
  });
  const variant = "female";
  const name = `${uuidv4()}.png`;
  const image = await avatar.generate(name, variant);
  await image.png().toFile(path.join(__dirname, `../tmp/${name}`));
  await moveFile(name);
  return `http://localhost:3000/images/${name}`;
};

const moveFile = async (name) => {
  await fsPromises.copyFile(
    path.join(__dirname, `../tmp/${name}`),
    path.join(__dirname, `../public/images/${name}`)
  );
  await fsPromises.unlink(path.join(__dirname, `../tmp/${name}`));
};

module.exports = {
  avatarService,
};
