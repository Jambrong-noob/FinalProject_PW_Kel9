const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const requireAuth = require('../middleware/authMiddleware');

// POST /api/bookings  (PUBLIC — dipanggil dari form pemesanan di index/layanan/tentang.html)
router.post('/', async (req, res) => {
  try {
    const { nama, telp, alamat, layanan, tanggal, jam, catatan } = req.body;

    if (!nama || !telp || !alamat || !layanan || !tanggal) {
      return res.status(400).json({ message: 'Mohon isi semua field yang diperlukan.' });
    }

    const telpDigits = telp.replace(/\D/g, '');
    if (!/^\d{10,13}$/.test(telpDigits)) {
      return res.status(400).json({ message: 'Nomor telepon tidak valid (10-13 digit angka).' });
    }

    const [result] = await pool.query(
      `INSERT INTO bookings (nama, telp, alamat, layanan, tanggal, jam, catatan)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nama, telp, alamat, layanan, tanggal, jam || null, catatan || null]
    );

    res.status(201).json({
      message: 'Pesanan berhasil dikirim! Admin akan segera menghubungi Anda.',
      id: result.insertId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

// GET /api/bookings  (ADMIN ONLY — untuk dashboard)
router.get('/', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bookings ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

// PATCH /api/bookings/:id/status  (ADMIN ONLY)
// Body: { status: 'pending' | 'diproses' | 'selesai' | 'dibatalkan' }
router.patch('/:id/status', requireAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatus = ['pending', 'diproses', 'selesai', 'dibatalkan'];

    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: 'Status tidak valid.' });
    }

    await pool.query('UPDATE bookings SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ message: 'Status berhasil diperbarui.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

// DELETE /api/bookings/:id  (ADMIN ONLY)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await pool.query('DELETE FROM bookings WHERE id = ?', [req.params.id]);
    res.json({ message: 'Pesanan berhasil dihapus.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

module.exports = router;
