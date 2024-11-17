const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createUser, findUserByGametag } = require('../models/User');
require('dotenv').config();

const register = async (req, res) => {
  const { gametag, password, rank, objective, playStyle, main } = req.body;
  try {
    const user = await createUser(gametag, password, rank, objective, playStyle, main);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  const { gametag, password } = req.body;
  try {
    const user = await findUserByGametag(gametag);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id, gametag: user.gametag }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = { register, login };