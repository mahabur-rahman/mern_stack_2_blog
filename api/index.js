const express = require("express");
const app = express();
const colors = require("colors");
const dotenv = require("dotenv");
// ROUTE
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const categoryRoute = require("./routes/category");

// dotenv config
dotenv.config();
const PORT = process.env.PORT || 5000;

// connected to db
const connectedDB = require("./db/connect");
connectedDB();

// middleware
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

// listen app
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
