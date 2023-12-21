const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const upload = require("../multer");

//create a post
router.post("/back/upload", upload.single("file"), async (req, res) => {
  // added /back/upload ?
  const post = { ...req.body };
  if (req.file) post.img = req.file.filename
  const newPost = new Post(post); //from 2 lines up
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update post
router.put("/:id", async (req, res) => {
  //:id to verify user
  try {
    const post = await Post.findByPk(req.params.id);
    if (post.userId === req.body.userId) {
      //making user user id is the same
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can only update your own post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can only delete your own post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//like / dislike a post
router.put("/:id/like", async (req, res) => {
  console.log("Request Payload:", req.body);
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      //if the post.likes includes the userId, it will like this post
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } }); //if the post.likes doesn't include the userId, it will dislike this post
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    console.error("Error updating post like:", err);
    res.status(500).json(err.message);
  }
});

//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  const currentUser = await User.findByPk(req.params.userId);
  const userPosts = await Post.findAll({ where: { userId: currentUser.id } }); //finds all posts from this userId, as defined in post model
  if (!currentUser.followings || !JSON.parse(currentUser.followings).length) {
    return res.status(200).json(userPosts);
  }
  const friendPosts = await Promise.all(
    JSON.parse(currentUser.followings).map((friendId) => {
      return Post.findAll({ where: { userId: friendId } });
    })
  );
  res.status(200).json(userPosts.concat(...friendPosts)); //take all friendPosts and concat with this post....what is concat?
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

//get all user's posts
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user.id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//seen posts


module.exports = router;
