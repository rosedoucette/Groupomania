const { DataTypes } = require("sequelize");
const sequelize = require("../Connect");

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING, //as opposed to min: 3, max: 20
      allowNull: false, //as opposed to required true?
      unique: true,
    },
    email: {
      type: DataTypes.STRING, //took out max: 50
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING, //removed min:6
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    coverPicture: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    followers: {
      type: DataTypes.STRING, //will save to localStorage this way
      defaultValue: "[]",
    },
    followings: {
      type: DataTypes.STRING,
      defaultValue: "[]",
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    desc: {
      type: DataTypes.STRING, //took out max:50
    },
    city: {
      type: DataTypes.STRING, //took out max:50
    },
    from: {
      type: DataTypes.STRING, //took out max:50
    },
    position: {
      type: DataTypes.STRING,
    },
    seenPosts: {
      type: DataTypes.STRING,
      defaultValue: "[]",
    }
  },
  { timestamps: true } //declare createdAt: CreationOptional<Date>; or updateAt;
);

User.sync({ alter: true })
  .then(() => {
    console.log("User table was synced successfully");
  })
  .catch((error) => {
    console.log("Error syncing User table", error); //this error is referncing the error param on line above
  });
module.exports = User;
