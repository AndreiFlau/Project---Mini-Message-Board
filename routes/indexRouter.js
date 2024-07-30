const { Router } = require("express");
const express = require("express");
const { body, validationResult } = require("express-validator");
const { getAllMessages, insertMessage } = require("../db/queries");
const { format } = require("date-fns");
const indexRouter = Router();

async function fetchMessages(req, res, next) {
  try {
    const messages = await getAllMessages();
    req.messages = messages;
    next();
  } catch (error) {
    next(error);
  }
}

indexRouter.use(fetchMessages);

indexRouter.get("/", (req, res) => {
  req.messages.forEach((element) => {
    console.log(element.username);
  });
  res.render("index", { messages: req.messages });
});

indexRouter.get("/:username/:message", (req, res) => {
  const username = req.params.username;
  const userMessage = decodeURIComponent(req.params.message);
  const messagesFromUser = req.messages.filter((message) => message.username === username);
  const filteredMessage = messagesFromUser.find((message) => message.message === userMessage);
  res.render("message", { message: filteredMessage });
});

indexRouter.post("/new", [
  body("username").trim().isLength({ min: 1 }).escape(),
  body("message").trim().isLength({ min: 1 }).escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const message = req.body.message;
    const username = req.body.username;
    await insertMessage(username, message, format(new Date(), "yyyy-MM-dd HH:mm:ss"));
    res.redirect("/");
  },
]);

module.exports = indexRouter;
