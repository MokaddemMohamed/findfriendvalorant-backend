// server.js
const express = require('express');
const authRoutes = require('./routes/auth');
const playerRoutes = require('./routes/players');
require('dotenv').config();

const app = express();
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/players', playerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
