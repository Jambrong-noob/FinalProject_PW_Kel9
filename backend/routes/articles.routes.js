const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /api/articles  (PUBLIC — dipakai di section "Daftar Artikel" index.html)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM articles ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

module.exports = router;
