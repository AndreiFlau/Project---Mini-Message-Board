const express = require("express");
const path = require("path");
const indexRouter = require("./routes/indexRouter");
const messageRouter = require("./routes/newMessageRouter");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.set(("views", path.join(__dirname, "views")));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/new", messageRouter);

const PORT = 8080;

app.listen(PORT, () => console.log(`listening to port: ${PORT}`));
