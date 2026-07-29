-- ==========================================================
-- Seed data — isi awal supaya sama persis dengan konten
-- yang sebelumnya hardcode di index.html / layanan.html / script.js
-- Jalankan SETELAH schema.sql
-- ==========================================================

USE klinking_db;

INSERT INTO services (name, slug, description, price, unit, badge) VALUES
('Cuci Express', 'cuci-express', 'Selesai dalam 6 jam, cocok untuk kebutuhan mendadak', 8000, 'kg', 'POPULER'),
('Cuci & Setrika', 'cuci-setrika', 'Paket lengkap paling laris, bersih dan rapi siap pakai', 7000, 'kg', 'BEST VALUE'),
('Hanya Setrika', 'hanya-setrika', 'Setrika uap premium, hasil rapi seperti baru', 5000, 'kg', NULL);

INSERT INTO articles (title, description, image) VALUES
('Promo Laundry 20%', 'Nikmati diskon 20% untuk semua layanan laundry selama bulan ini.', 'image/diskon20%.jpg'),
('Cuci Express 24 Jam', 'Layanan express membuat pakaian selesai hanya dalam 24 jam.', 'image/24jam.jpg'),
('Gratis Antar Jemput', 'Khusus area Pringgolayan tersedia layanan antar jemput gratis.', 'image/freedeliv.jpg'),
('Tips Merawat Pakaian Putih', 'Pisahkan pakaian putih dan gunakan deterjen khusus agar warna tetap cerah.', 'image/peduli.jpg'),
('Laundry Hotel & Kos', 'Kami menerima laundry dalam jumlah besar untuk hotel dan anak kos.', 'image/hotel.jpg'),
('Paket Hemat Bulanan', 'Tersedia paket langganan laundry bulanan dengan harga lebih murah.', 'image/promo.png'),
('Setrika Premium', 'Pakaian disetrika dengan rapi menggunakan pewangi premium.', 'image/setrika.png'),
('Laundry Sepatu', 'Kami melayani pencucian sepatu agar kembali bersih dan wangi.', 'image/sepatu.jpg'),
('Laundry Selimut', 'Selimut dan bed cover dicuci menggunakan mesin khusus berkapasitas besar.', 'image/selimut.jpg'),
('Jam Operasional', 'Buka setiap hari mulai pukul 08.00 hingga 21.00 WIB.', 'image/jam.jpg');

-- Akun admin TIDAK dibuat lewat SQL manual, karena password harus di-hash
-- dengan bcrypt terlebih dahulu (supaya aman, bukan plain text).
-- Setelah backend/npm install selesai, jalankan:
--
--   node backend/scripts/createAdmin.js admin admin123
--
-- Script ini akan otomatis meng-hash password dan insert ke tabel `admins`.
