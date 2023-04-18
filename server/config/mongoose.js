const mongoose = require("mongoose");


//connect to the database
mongoose.connect( process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//acquire the connection
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

// once the connection is established
db.once("open", function () {
  console.log("Connected to Database :: MongoDB - React-Shopify");
});

module.exports = db;


