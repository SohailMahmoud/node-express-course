const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect")
require("dotenv").config()

// add static assests
app.use(express.static("./public"));

// middleware
app.use(express.json());

// routes
app.use("/api/v1/tasks", tasks);

// setting the port and connect to the db
const port = 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(3000, () => {
      console.log(`Server is alive at port ${port}...`);
    });
  } catch(error) {
    console.log(error);
  }
}
start()