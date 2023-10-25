const { Sequelize, DataTypes } = require("sequelize") //pulling Sequalize out of sequelize
const sequelize = new Sequelize({ dialect: "sqlite", storage: "../Database.db" }) //connecting to the database folder by passing in those 2 objects

sequelize.authenticate().then(() => { console.log("sequelize running!") }).catch((err) => { console.log("sequelize not working :(", err) });
module.exports = sequelize

//making sequelize work.
//singleton pattern...kind of. 
//centralizing sequelize in this one file rather than in each model