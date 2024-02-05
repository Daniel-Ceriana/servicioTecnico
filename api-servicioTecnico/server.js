// require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const userRouter = require("./src/routes/userRouter");
const taskRouter = require("./src/routes/taskRouter");

require("./src/config/db");

app.use(express.json());
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000"
};
app.use(cors(corsOptions));
app.use(passport.initialize());




app.get("/", (req, res) => res.send("home"));
app.use("/api", userRouter);
app.use("/api/tasks", taskRouter);

app.listen(process.env.PORT, () =>
  console.log("Server running on port: " + process.env.PORT)
);
