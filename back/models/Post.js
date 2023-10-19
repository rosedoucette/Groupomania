const { Sequelize, DataTypes } = require("sequelize"); //pulling Sequalize out of sequelize
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../../Database.db",
}); //connecting to the database folder by passing in those 2 objects

const Post = sequelize.define(
  "Post",
  {
    PostId: {
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
      type: DataTypes.ARRAY,
      default: [],
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
