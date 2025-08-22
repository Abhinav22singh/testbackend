const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Book = require('./src/models/Book');

// Load env variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    seedData();
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });

// Seed data function
const seedData = async () => {
  try {
    const booksPath = path.join(__dirname, 'src', 'data', 'books.json');
    const books = JSON.parse(fs.readFileSync(booksPath, 'utf-8'));

    await Book.deleteMany(); // Optional: Clear existing data
    await Book.insertMany(books);

    console.log(`✅ Successfully seeded ${books.length} books`);
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
};
