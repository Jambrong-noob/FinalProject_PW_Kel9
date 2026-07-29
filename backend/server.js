const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const bookingsRoutes = require('./routes/bookings.routes');
const servicesRoutes = require('./routes/services.routes');
const articlesRoutes = require('./routes/articles.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/articles', articlesRoutes);

// Serve file frontend statis (index.html, layanan.html, dst) yang ada satu folder di atas /backend
app.use(express.static(path.join(__dirname, '..')));

app.listen(PORT, () => {
  console.log(`✅ KlinKing backend jalan di http://localhost:${PORT}`);
});
