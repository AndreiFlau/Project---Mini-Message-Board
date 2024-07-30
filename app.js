const express = require("express");
const path = require("path");
const indexRouter = require("./routes/indexRouter");
const messageRouter = require("./routes/newMessageRouter");
require("dotenv").config();
const app = express();

app.use(express.urlencoded({ extended: true }));

app.set(("views", path.join(__dirname, "views")));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/new", messageRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`listening to port: ${PORT}`));
