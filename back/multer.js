const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public/images/")); //ensures you provide an absolute path for the image upload destination
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-req.body.name`); //referencing data.append"name" from Share.jsx
  },
});

const upload = multer({ storage });

module.exports = upload;
