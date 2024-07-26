const { Router } = require("express");
const express = require("express");
const indexRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

indexRouter.get("/", (req, res) => {
  res.render("index", { messages: messages });
});

indexRouter.get("/:username/:message", (req, res) => {
  const params = req.params;
  const messagesFromUser = messages.filter((message) => message.user === params.username);
  const filteredMessage = messagesFromUser.find((message) => message.text === params.message);
  res.render("message", { message: filteredMessage });
});

indexRouter.post("/new", (req, res) => {
  console.log(req.body);
  const message = req.body.message;
  const name = req.body.name;
  messages.push({ text: message, user: name, added: new Date() });
  res.redirect("/");
});

module.exports = indexRouter;
