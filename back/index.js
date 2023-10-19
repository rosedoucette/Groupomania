const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const multer = require("multer");
const path = require("path");

dotenv.config();

//connect to sequelize//
//mongoose example:
// mongoose.connect(
//   process.env.MONGO_URL,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => {
//     console.log("Connected to MongoDB");
//   }
// );


app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json()); //body parser for making requests
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name); //referencing data.append"name" from Share.jsx
  },
});

const upload = multer({ storage });
app.post("/back/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (err) {

  }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

app.listen(3000, () => {
  console.log("Backend server is running!");
});


//TEST MESSAGES ON LOCALHOST ON BROWSER//
// app.get("/", (req, res) => {
//   res.send("welcome to homepage");
// });

//example on how to direct to different browser extensions...localhost:3000/users
// app.get("/users", (req, res) => {
//     res.send("welcome to user page");
//   });