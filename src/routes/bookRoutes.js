const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const { suggestBooks } = require('../controllers/bookController')

const router = express.Router();

router.get('/suggestions', suggestBooks);


module.exports = router;

