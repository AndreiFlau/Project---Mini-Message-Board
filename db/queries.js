const pool = require("./pool");
const { format } = require("date-fns");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows.map((message) => ({
    id: message.id,
    username: message.username,
    message: message.message,
    createdAt: format(new Date(message.created_at), "yyyy-MM-dd HH:mm:ss"),
  }));
}

async function insertMessage(username, message, createdAt) {
  await pool.query("INSERT INTO messages (username, message, created_at) VALUES ($1, $2, $3)", [username, message, createdAt]);
}

module.exports = {
  getAllMessages,
  insertMessage,
};
