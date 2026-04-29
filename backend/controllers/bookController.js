const Book = require('../models/Book');
const AuditLog = require('../models/AuditLog');

// Get All Books with Search & Filter
exports.getBooks = async (req, res) => {
  try {
    const { search, genre, condition, minPrice, maxPrice } = req.query;
    let query = {};

    // Search (Title or Author)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by Genre
    if (genre) {
      query.genre = genre;
    }

    // Filter by Condition
    if (condition) {
      query.condition = condition;
    }

    // Filter by User
    if (req.query.userId && req.query.userId !== 'undefined') {
        query.userId = req.query.userId;
    }

    // Filter by Price Range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const books = await Book.find(query).populate('userId', 'username').sort({ postedDate: -1 });
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Single Book
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('userId', 'username');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create Book
exports.addBook = async (req, res) => {
  try {
    const { title, author, genre, condition, description, location, price, image } = req.body;
    const userId = req.user.userId;

    // Basic Validation
    if (!title || !author || !genre || !condition || !price) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    let imageUrl = image; // Default to body image (e.g. url string) if provided
    if (req.file) {
        imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const book = new Book({
      title,
      author,
      genre, // Ensure this matches schema 'category' vs 'genre'. Schema now uses 'genre'.
      condition,
      description,
      location: location || 'Unknown',
      image: imageUrl,
      price,
      userId,
    });

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update Book (Own only)
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Check ownership
    if (book.userId.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Handle Image Update
    if (req.file) {
        req.body.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Book (Own or Admin)
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Check ownership or admin role
    if (book.userId.toString() !== req.user.userId && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized' });
    }

    // Log the deletion
    await AuditLog.create({
        action: 'DELETE_BOOK',
        bookTitle: book.title,
        bookId: book._id.toString(),
        sellerId: book.userId,
        deletedBy: req.user.userId
    });

    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Book deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Buy Book
exports.buyBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (book.status === 'Sold') {
      return res.status(400).json({ message: 'Book is already sold' });
    }

    if (book.userId.toString() === req.user.userId) {
        return res.status(400).json({ message: 'You cannot buy your own book' });
    }

    // Use findByIdAndUpdate to bypass validation of other fields (legacy data support)
    const updatedBook = await Book.findByIdAndUpdate(
        req.params.id, 
        { 
            status: 'Sold', 
            buyerId: req.user.userId, 
            soldDate: Date.now() 
        }, 
        { new: true } 
    );
    
    // Create Audit Log
    try {
        await AuditLog.create({
            action: 'BUY_BOOK',
            bookTitle: book.title,
            bookId: book._id,
            sellerId: book.userId,
            deletedBy: req.user.userId, // Using deletedBy field for the actor (buyer) to satisfy schema if needed, though we made it optional now.
            // ideal would be a generic 'actorId' or 'performedBy' but to minimize schema changes we relax 'deletedBy'
        });
    } catch (auditError) {
        console.error('Audit log creation failed:', auditError);
        // Continue even if audit fails? Yes.
    }

    res.status(200).json({ message: 'Book purchased successfully', book: updatedBook });
  } catch (error) {
    console.error('Error buying book:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};