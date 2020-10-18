const mongoose = require("mongoose");
const dbConfig = require("config").get("db");

module.exports.connect = async function connectToDb() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || dbConfig.uri,
      dbConfig.options
    );
    console.log("connected to DB");
  } catch (error) {
    console.log("db connection failed");
    console.error(error);
  }
};
