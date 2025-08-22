const Book = require('../models/Book');

const suggestBooks = async (req, res) => {
  try {
    const { age, genre } = req.query;

    const query = {};

    if (age && !isNaN(age)) {
      query.ageGroup = { $lte: parseInt(age) };
    }

    if (genre) {
      query.genre = { $regex: new RegExp(genre, 'i') };
    }

    const suggestions = await Book.find(query).limit(10);
    res.status(200).json(suggestions);
  } catch (error) {
    console.error('Error fetching suggestions:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  suggestBooks,
};
