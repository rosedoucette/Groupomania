const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create a post
router.post("/api/back/upload", async (req, res) => { 
  // added /back/upload ?
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update post
router.put("/api/:id", async (req, res) => {
  //:id to verify user
  try {
    const post = await Post.findById(req.params.id);
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
router.delete("/api/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
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
router.put("/api/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      //if the post.likes includes the userId, it will like this post
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } }); //if the post.likes doesn't include the userId, it will dislike this post
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a post
router.get("/api/id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts
router.get("/api/timeline/:userId", async (req, res) => {

  const currentUser = await User.findById(req.params.userId);
  const userPosts = await Post.find({ userId: currentUser.id }); //finds all posts from this userId, as defined in post model
  const friendPosts = await Promise.all(
    currentUser.followings.map((friendId) => {
      return Post.find({ userId: friendId });
    })
  );
  res.status(200).json(userPosts.concat(...friendPosts)); //take all friendPosts and concat with this post....what is concat?
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

//get all user's posts
router.get("/api/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
