const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const colors = require("colors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: "./config.env" });

const connectToDatabase = require("./dbConnection");

app.use(express.json());

app.use("/api", require("./router/fetchData"));
app.use(require("./router/userRoute"));
app.use(require("./router/postOrder"));

app.use(express.static(path.join(__dirname, "./build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

// Default error handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});



    app.listen(port, () => {
      console.log(`Listening on port ${port}`.bgGreen);
    });
