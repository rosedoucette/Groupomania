const {Sequelize, DataTypes} = require ("sequelize") //pulling Sequalize out of sequelize
const sequelize = new Sequelize ({dialect: "sqlite", storage: "../../Database.db"}) //connecting to the database folder by passing in those 2 objects

const User = sequelize.define ("User",
  {
    username: {
      type: DataTypes.STRING(20), //as opposed to min: 3, max: 20
      allowNull: false, //as opposed to required true?
      unique: true,
    },
    email: {
      type: DataTypes.STRING(50), //took out max: 50
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(50), //removed min:6
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
      default: "",
    },
    coverPicture: {
      type: DataTypes.STRING,
      default: "",
    },
    followers: {
      type: DataTypes.ARRAY,
      default: [],
    },
    followings: {
      type: DataTypes.ARRAY,
      default: [],
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    desc: {
      type: DataTypes.STRING(50), //took out max:50
    },
    city: {
      type: DataTypes.STRING(50), //took out max:50
    },
    from: {
      type: DataTypes.STRING(50), //took out max:50
    },
    relationship: {
      type: DataTypes.NUMBER,
      enum: [1, 2, 3], //1 single, 2 married, etc.
    },
  },
  { timestamps: true } //declare createdAt: CreationOptional<Date>; or updateAt;
);

User.sync({alter: true}).then(()=>{
    console.log("User table was synced successfully")
}).catch((error)=>{
    console.log("Error syncing User table", error) //this error is referncing the error param on line above
})
module.exports = User;