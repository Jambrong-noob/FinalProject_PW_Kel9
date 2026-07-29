-- ==========================================================
-- KlinKing Database Schema (MySQL)
-- Jalankan file ini di MySQL untuk membuat database & tabel
-- ==========================================================

CREATE DATABASE IF NOT EXISTS klinking_db;
USE klinking_db;

-- Tabel layanan (menggantikan harga yang hardcode di 3 file HTML)
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description VARCHAR(255),
  price INT NOT NULL,            -- dalam rupiah per kg
  unit VARCHAR(20) DEFAULT 'kg',
  badge VARCHAR(50),              -- contoh: 'POPULER', 'BEST VALUE'
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel pemesanan (menggantikan localStorage)
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  telp VARCHAR(20) NOT NULL,
  alamat TEXT NOT NULL,
  layanan VARCHAR(100) NOT NULL,
  tanggal DATE NOT NULL,
  jam VARCHAR(30),
  catatan TEXT,
  status ENUM('pending', 'diproses', 'selesai', 'dibatalkan') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel artikel (menggantikan array hardcoded di script.js)
CREATE TABLE IF NOT EXISTS articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel admin (untuk login dashboard)
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
