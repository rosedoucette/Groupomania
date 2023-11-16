const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update user
router.put("/api/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) { //params.id is referncing the id on the line above. we're checking if they are the same ids.
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
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
router.delete("/api/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can only delete your own account!");
    }
});

//get a user
router.get("/api/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await User.findById(userId) //if user has userId
            : await User.findOne({ username: username }); //if user has username
        const { password, updatedAt, ...other } = user._doc; //doc refences the info from the database request
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get friends
router.get("/api/friend/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId); //userId defined just above
        const friends = await Promise.all(
            user.followings.map(friendId => {
                return User.findById(friendId)
            })
        )
        let friendList = [];
        friends.map(friend => {
            const { id, username, profilePicture } = friend;
            friendList.push({ id, username, profilePicture });
        });
        res.status(200).json(friendList)
    } catch (err) {
        res.status(500).json(err)
    }
});

//follow a user
router.put("/api/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) { //checking if it's the same user
        try {
            const user = await User.findById(req.params.id); //we want to find the user defined in the put string :/id/
            const currentUser = await User.findById(req.body.userId); //the function is saying if the current user is not following this other user, then we will update the id so that they are
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
router.put("/api/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
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

module.exports = router;