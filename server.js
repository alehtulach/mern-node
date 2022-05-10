require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");

const PORT = process.env.PORT || 3500;

connectDB();

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// middleware to handle form data
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/register", require("./routs/register"));
app.use("/auth", require("./routs/auth"));

app.all("*", (req, res) => {
  res.status(404).send("404 Not Found");
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
