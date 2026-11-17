require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`
      <h1>ACPay Server is LIVE 24/7!</h1>
      <p>Permanent Neon Database Connected: <b>YES</b></p>
      <p>Database Time: ${result.rows[0].now}</p>
    `);
  } catch (err) {
    res.status(500).send(`<h1>Database Error</h1><p>${err.message}</p>`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
