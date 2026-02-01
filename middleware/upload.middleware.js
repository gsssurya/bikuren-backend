const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const dayjs = require("dayjs");
const imageFilter = require("./filterImg.middleware");

const createStorage = (folder = "") => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${folder}`);
    },
    filename: (req, file, cb) => {
      const today = dayjs().format("YYYY-MM-DD");
      const extension = path.extname(file.originalname);
      const uniqueSuffix = `${uuidv4()}-${today}${extension}`;
      cb(null, uniqueSuffix);
    }
  });
};

const uploadSingle = (folder = "profiles") => {
  return (req, res, next) => {
    const upload = multer({
      storage: createStorage(folder),
      fileFilter: imageFilter,
      limits: {
        fileSize: 500 * 1024
      }
    }).single("foto");

    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          message: err.message
        });
      }
      next();
    });
  };
};

module.exports = uploadSingle;