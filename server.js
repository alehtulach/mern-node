require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const verifyJWT = require("./middleware/verifyJWT");

// just some unused comment for testing purpose
const PORT = process.env.PORT || 3500;

connectDB();

app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// middleware to handle form data
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));

app.use(verifyJWT);
app.use("/users", require("./routes/api/users"));

app.all("*", (req, res) => {
  res.status(404).send("404 Not Found");
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
