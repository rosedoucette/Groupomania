const { DataTypes } = require("sequelize");
const sequelize = require("../Connect");


const Post = sequelize.define(
  "Post",
  {
    PostId: {
      type: DataTypes.STRING,
      required: true,
    },
    userId: {
      type: DataTypes.STRING,
      required: true,
    },
    desc: {
      type: DataTypes.STRING,
      max: 500,
    },
    img: {
      type: DataTypes.STRING,
    },
    likes: {
      type: DataTypes.STRING,
      default: "[]",
    },
  },
  { timestamps: true }
);

Post.sync({ alter: true })
  .then(() => {
    console.log("Post table was synced successfully");
  })
  .catch((error) => {
    console.log("Error syncing Post table", error); //this error is referncing the error param on line above
  });

module.exports = Post;
