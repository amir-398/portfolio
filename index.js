const express = require("express");
const app = express();
const port = "3000";
const projectRoute = require("./routes/projectRoute");
const infoRoute = require("./routes/infoRoute");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/portfolio");
app.use(express.urlencoded());
app.use(express.json());
app.use("/projects", projectRoute);
app.use("/infos", infoRoute);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
