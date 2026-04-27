const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(

  "mongodb://sai:1234@ac-hpu9quk-shard-00-00.vevnklp.mongodb.net:27017,ac-hpu9quk-shard-00-01.vevnklp.mongodb.net:27017,ac-hpu9quk-shard-00-02.vevnklp.mongodb.net:27017/projectdb?ssl=true&replicaSet=atlas-wjn2gt-shard-0&authSource=admin&retryWrites=true&w=majority"
    );
    console.log("MongoDB Atlas Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;