require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "font-src": ["'self'", 'http://localhost:5000'],
        "img-src": ["'self'", 'data:', 'http://localhost:5000'],
        "style-src": ["'self'", "'unsafe-inline'", 'http://localhost:5000'],
        "script-src": ["'self'", "'unsafe-inline'"]
      },
    },
  })
);

app.use(cors());
app.use(express.json());

// Rate limiter
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'middleware', 'uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
