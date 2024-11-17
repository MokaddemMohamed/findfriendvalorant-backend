// models/User.js
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const createUser = async (gametag, password, rank, objective, playStyle, main) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `INSERT INTO users (gametag, password, rank, objective, play_style, main) 
                 VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  const values = [gametag, hashedPassword, rank, objective, playStyle, main];
  const res = await pool.query(query, values);
  return res.rows[0];
};

const findUserByGametag = async (gametag) => {
  const query = `SELECT * FROM users WHERE gametag = $1`;
  const res = await pool.query(query, [gametag]);
  return res.rows[0];
};

module.exports = { createUser, findUserByGametag };
