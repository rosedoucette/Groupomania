const express = require("express");
const app = express();
const cors = require("cors");
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

//cors middleware:
app.use(cors({
  origin: 'http://localhost:3001', // Replace with your frontend domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

//REMOVED::
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   next();
// });
//has to come before routes/everything
//whitelisting sites with different domain names/urls then the server itself

app.use("/api/images", express.static(path.join(__dirname, "public/images/")));

//middleware
app.use(express.json()); //body parser for making requests
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev")); //changed common to dev

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public/images/")); //ensures you provide an absolute path for the image upload destination
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name); //referencing data.append"name" from Share.jsx
  },
});

const upload = multer({ storage });
app.post("/api/back/upload", upload.single("file"), (req, res) => {
  try {
    console.log(req.file); //who is uploading the pic.
    // so the pic and username are linked.
    // Grab user from database so it knows who's profile picture is uploaded
    // Grab the user. update the user with profile pic.
    return res.status(200).json("File uploaded successfully");
  } catch (err) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
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
