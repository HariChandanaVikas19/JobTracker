require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConfig");
const errorHandler = require("./middleware/errorHandler");

const app = express();
connectDB();

const port = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" })); // your Vite URL
app.use(express.json());
app.use("/api/jobs", require("./routes/JobRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});