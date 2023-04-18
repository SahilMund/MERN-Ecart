const express = require("express");
const app = express();
const ErrorHandler = require("./utils/handleError");
require("dotenv").config({
  path: "../server/config/.env",
});

const cookieParser = require("cookie-parser");
const db = require("./config/mongoose");

const cors = require('cors')

app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  

//middleware used to parse the data coming from the ejs form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


//adding static files
app.use(express.static("./assets"));

// use express router
app.use("/", require("./routes/index"));

const PORT = process.env.PORT || 7000;

app.listen(process.env.PORT, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${PORT} ..........`);
});
