require("dotenv").config({ path: "./config/config.env" });

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios");

//Initialize express app
const app = express();

const connectDB = require("./config/db");

const auth = require("./middlewares/auth");
// const scheduleTask = require("./routes/scheduleTasks");

//middleware
app.use(express.json()); //sending repsonses in json format, this middleware will parse the data and send it in json format.

app.use(morgan("tiny")); //Morgan logs useful information about HTTP requests and responses, such as the request method, the URL, the status code, and the length of the response body

app.use(require("cors")()); //used in Authorization

//routes
app.use("/api", require("./routes/auth"));
// app.use("/uploads", express.static("./uploads"));
// app.use("/api", require("./routes/course"));
// app.use("/api", require("./routes/timetable"));
// app.use("/api", require("./routes/student"));
// app.use("/api", require("./routes/classroom"));
// app.use("/api", require("./routes/resource"));
// app.use("/api", require("./routes/booking"));
// app.use("/api", require("./routes/announcement"));

// schedule task automatically deleted
// scheduleTask();


app.use(bodyParser.json());


//server configurations.
const PORT = process.env.PORT || 8000; //3000 port we will use  for frontend
app.listen(PORT, async () => {
  //We dont want to start the server until we are connected to the database.
  //therefore we are going to use async await.
  //In the terminal we will see the message "server listening on port: 8000" only after we are connected to the database.
  try {
    await connectDB();
    console.log(`server listening on port: ${PORT}`);
  } catch (err) {
    console.log(err);
  }
  //we dont want the error to shut down the server, therefore we are going to use try catch.
  //we catch the error and log it to the console.
});
