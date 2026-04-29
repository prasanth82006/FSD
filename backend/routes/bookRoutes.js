const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public: Get all books (with optional filters)
router.get('/', bookController.getBooks);

// Public: Get single book
router.get('/:id', bookController.getBookById);

// Protected: Create book
router.post('/', auth, upload.single('image'), bookController.addBook);

// Protected: Update book (Owner)
router.put('/:id', auth, upload.single('image'), bookController.updateBook);

// Protected: Delete book (Owner/Admin)
router.delete('/:id', auth, bookController.deleteBook);

// Protected: Buy book
router.post('/:id/buy', auth, bookController.buyBook);

module.exports = router;
