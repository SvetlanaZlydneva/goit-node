const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const path = require("path");
const { promises: fsPromises } = require("fs");

const imageMinService = async (req, res, next) => {
  try {
    const MINIFIED_DIR = "public/images";
    await imagemin(["tmp/" + req.file.filename], {
      destination: MINIFIED_DIR,
      plugins: [
        imageminJpegtran(),
        imageminPngquant({
          quality: [0.6, 0.8],
        }),
      ],
    });
    const { filename, path: tmpPath } = req.file;
    await fsPromises.unlink(tmpPath);
    req.file = {
      ...req.file,
      path: path.join(MINIFIED_DIR, filename),
      destination: MINIFIED_DIR,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  imageMinService,
};
