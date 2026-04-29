const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    // enum: ['fiction', 'non-fiction', 'fantasy', 'mystery', 'romance', 'science'], // Removing strict enum to allow flexibility or add 'other'
  },
  condition: {
    type: String,
    required: true,
    enum: ['New', 'Like New', 'Used', 'excellent', 'good', 'fair'], // Expanded to support legacy data
  },
  description: {
    type: String,
    trim: true,
  },
  location: { // Kept for local exchange context
    type: String,
    // required: true, 
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
  },
  userId: { // Seller
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['Available', 'Sold'],
    default: 'Available',
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  soldDate: {
    type: Date,
  },
});

module.exports = mongoose.model('Book', bookSchema);