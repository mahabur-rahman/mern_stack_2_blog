const mongoose = require("mongoose");
const DB = process.env.MONGO_URL;

// connect to db
const connectedDB = async () => {
  const conn = await mongoose.connect(DB);

  try {
    console.log(`mongoDB connected : ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(`No connection : ${err.red.underline}`);
  }
};

// export
module.exports = connectedDB;
