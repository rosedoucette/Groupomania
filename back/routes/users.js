const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    //params.id is referncing the id on the line above. we're checking if they are the same ids.
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByPkAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can only update your account!");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.status(200).json("Account has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = decodeURIComponent(req.query.username);
  console.log(username);
  console.log(userId);

  const user = userId
    ? await User.findByPk(userId) //if user has userId
    : await User.findOne({ where: { username: username } }).catch((e) => {
        console.log(e);
      }); //if user has username
  if (!user) {
    return res.status(404).json("user not found");
  }
  console.log(user);
  const { password, updatedAt, ...other } = user.dataValues;
  res.status(200).json(other);
});

//get friends
router.get("/friend/:userId", async (req, res) => {
  //friends???
  try {
    const user = await User.findByPk(req.params.userId); //userId defined just above
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findByPk(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { id, username, profilePicture } = friend;
      friendList.push({ id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    //checking if it's the same user
    try {
      const user = await User.findByPk(req.params.id); //we want to find the user defined in the put string :/id/
      const currentUser = await User.findByPk(req.body.userId); //the function is saying if the current user is not following this other user, then we will update the id so that they are
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.useId } }); //$push means pushing the user id to the followers
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("your can't follow yourself");
  }
});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findByPk(req.params.id);
      const currentUser = await User.findByPk(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you don't follow this user");
      }
    } catch (err) {
      //THERE IS MORE HERE AND AFTER...//
    }
  }
});

//from conor:
router.post("/:userId/:postId", async (req, res) => { 
  //this isn't the URL though, so how exactly would this work?
  const user = await User.findByPk(req.params.userId);
  //pulls user from data table w/pk based on the userId parameter
  const seenPosts = JSON.parse(user.seenPosts || "[]").push(req.params.postId);
  //either parses seenPosts string or initializes it as empty array if not present. Push returns new length of array, not updated array
  user.seenPosts = JSON.stringify(seenPosts);
  //converts the updated seenPosts back to a JSON string and assigns that property to the user object
  user
    .save()
    //saves updated user object to the database
    .then(() => {
      return res.status(201).json(user);
    })
    .catch(() => {
      return res
        .status(500)
        .json("something went wrong updating seenPosts on the user");
    });
    //handles the result of that save operation. success=201, error=500+message
});


module.exports = router;
