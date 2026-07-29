const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const requireAuth = require('../middleware/authMiddleware');

// GET /api/services  (PUBLIC — dipakai di index.html & layanan.html)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM services WHERE is_active = 1');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

// POST /api/services  (ADMIN ONLY — tambah layanan baru)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { name, slug, description, price, unit, badge } = req.body;

    if (!name || !slug || !price) {
      return res.status(400).json({ message: 'Nama, slug, dan harga wajib diisi.' });
    }

    const [result] = await pool.query(
      `INSERT INTO services (name, slug, description, price, unit, badge)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, slug, description || null, price, unit || 'kg', badge || null]
    );

    res.status(201).json({ message: 'Layanan berhasil ditambahkan.', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

// PATCH /api/services/:id  (ADMIN ONLY — update harga/deskripsi)
router.patch('/:id', requireAuth, async (req, res) => {
  try {
    const { name, description, price, unit, badge, is_active } = req.body;

    await pool.query(
      `UPDATE services SET
        name = COALESCE(?, name),
        description = COALESCE(?, description),
        price = COALESCE(?, price),
        unit = COALESCE(?, unit),
        badge = COALESCE(?, badge),
        is_active = COALESCE(?, is_active)
       WHERE id = ?`,
      [name, description, price, unit, badge, is_active, req.params.id]
    );

    res.json({ message: 'Layanan berhasil diperbarui.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

module.exports = router;
