const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const upload = require("../multer");

//REGISTER
router.post("/register", upload.single("profilePicture"), async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    console.log(req.file);
    const newUser = new User({
      ...req.body, //spreading - pulling in all the properties of the object, like below email, from, etc.
      // username: req.body.username,
      // email: req.body.email,
      password: hashedPassword,
      // from: req.body.from,
      // position: req.body.position,
      profilePicture: req.file.filename,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } }) //where is ther syntax for sequelize
      .then((anything) => {
        console.log(anything);
        return anything;
      });
    if (!user) return res.status(404).json("user not found"); //is user doesn't exist, return 404//

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    ); //comparing the req.body.password with the user password//
    if (!validPassword) return res.status(404).json("wrong password");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
