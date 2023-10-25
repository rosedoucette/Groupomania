const { Sequelize, DataTypes } = require("sequelize") //pulling Sequalize out of sequelize
export const sequelize = new Sequelize({ dialect: "sqlite", storage: "../Database.db" }) //connecting to the database folder by passing in those 2 objects

sequelize.authenticate().then(() => { console.log("sequelize running!") }).catch((err) => { console.log("sequelize not working :(", err) });
export default sequelize