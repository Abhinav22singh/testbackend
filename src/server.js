require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db'); // make sure db.js uses global caching
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "font-src": ["'self'"],
        "img-src": ["'self'", 'data:'],
        "style-src": ["'self'", "'unsafe-inline'"],
        "script-src": ["'self'", "'unsafe-inline'"]
      },
    },
  })
);

app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use('/uploads', express.static(path.join(__dirname, 'middleware', 'uploads')));

// Connect to MongoDB using serverless-friendly caching
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

// Export the app for Vercel serverless
module.exports = app;
module.exports.config = { runtime: 'nodejs18.x' };
