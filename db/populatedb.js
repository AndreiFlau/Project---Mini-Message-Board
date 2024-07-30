const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  message VARCHAR ( 255 ),
  created_at TIMESTAMP WITH TIME ZONE
);

INSERT INTO messages (username, message, created_at) 
VALUES
  ('Pingas', 'Hello!', CURRENT_TIMESTAMP),
  ('Odin', 'How is your day going?', CURRENT_TIMESTAMP),
  ('Damon', 'What''s up!', CURRENT_TIMESTAMP);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_STRING,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
