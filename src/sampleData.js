equire('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Book = require('../models/Book');
const connectDB = require('../config/db');

const importData = async () => {
  try {
    await User.deleteMany();
    await Book.deleteMany();

    const users = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10),
        isAdmin: true,
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: await bcrypt.hash('john123', 10),
        isAdmin: false,
      },
    ];

    const createdUsers = await User.insertMany(users);
    const adminUserId = createdUsers[0]._id;

    const books = [
      {
        title: 'JavaScript: The Definitive Guide',
        description: 'Comprehensive guide to JavaScript.',
        author: 'David Flanagan',
        price: 49.99,
              stock: 10,
        user: adminUserId,
      },
      {
        title: 'Clean Code',
        description: 'Writing clean, maintainable code.',
        author: 'Robert C. Martin',
        price: 39.99,
        stock: 8,
        user: adminUserId,
      },
    ];

    await Book.insertMany(books);
    console.log('Sample data imported');
    process.exit();
  } catch (err) {
    console.error('Import error:', err);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Book.deleteMany();
    console.log('Data destroyed');
    process.exit();
  } catch (err) {
    console.error('Destroy error:', err);
    process.exit(1);
  }
};

connectDB().then(() => {
  if (process.argv[2] === '-d') destroyData();
  else importData();
});