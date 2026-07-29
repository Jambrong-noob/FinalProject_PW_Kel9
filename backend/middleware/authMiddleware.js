const jwt = require('jsonwebtoken');
require('dotenv').config();

// Melindungi route admin (GET semua booking, update status, dsb).
// Cara pakai di frontend: kirim header
//   Authorization: Bearer <token>
// token didapat dari POST /api/auth/login
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token tidak ditemukan. Silakan login.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // { id, username }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token tidak valid atau sudah kedaluwarsa.' });
  }
}

module.exports = requireAuth;
