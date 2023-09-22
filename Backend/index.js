const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./Config/connect')
dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("This is the backend server for the TaxSaarthi");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`);
});

