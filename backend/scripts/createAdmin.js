// Membuat akun admin baru dengan password yang di-hash (bcrypt).
// Cara pakai:
//   node backend/scripts/createAdmin.js <username> <password>
// Contoh:
//   node backend/scripts/createAdmin.js admin admin123

const bcrypt = require('bcryptjs');
const pool = require('../config/db');

async function createAdmin() {
  const [, , username, password] = process.argv;

  if (!username || !password) {
    console.log('Cara pakai: node backend/scripts/createAdmin.js <username> <password>');
    process.exit(1);
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO admins (username, password_hash) VALUES (?, ?)', [username, hash]);
    console.log(`✅ Admin '${username}' berhasil dibuat.`);
  } catch (err) {
    console.error('❌ Gagal membuat admin:', err.message);
  } finally {
    pool.end();
  }
}

createAdmin();
