const path = require("path");
const multer = require("multer");
const fs = require("fs");

const createRoutes = (req) => {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = date.getMonth().toString();
  const day = date.getDate().toString();
  const directory = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    year,
    month,
    day
  );
  req.body.fileUploadPath = path.join("uploads", year, month, day);
  fs.mkdirSync(directory, { recursive: true });
  return directory;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.originalname) {
      const filePath = createRoutes(req);
      return cb(null, filePath);
    }
    cb(null, null);
  },
  filename: (req, file, cb) => {
    if (file.originalname) {
      const ext = path.extname(file.originalname);
      const fileName = String(new Date().getTime() + ext);
      req.body.fileName = fileName;
      return cb(null, fileName);
    }
    cb(null, null);
  },
});

const upload = multer({ storage });

module.exports = {
  upload,
};
