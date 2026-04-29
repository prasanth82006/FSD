const User = require('../models/User');
const Book = require('../models/Book');

// Get Wishlist
exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('wishlist');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add to Wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.userId;

    // Use $addToSet to prevent duplicates automatically
    const user = await User.findByIdAndUpdate(
        userId, 
        { $addToSet: { wishlist: bookId } },
        { new: true }
    );
    
    res.status(200).json({ message: 'Added to wishlist', wishlist: user.wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove from Wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.userId;
    
    // Use $pull to remove item
    const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { wishlist: bookId } },
        { new: true }
    );
    
    res.status(200).json({ message: 'Removed from wishlist', wishlist: user.wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    // Check if admin (Middleware should handle this usually, but double check)
    // Assuming req.user.role is populated by auth middleware
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Get Stats
exports.getStats = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        
        const totalUsers = await User.countDocuments();
        const totalBooks = await Book.countDocuments();
        
        res.status(200).json({ totalUsers, totalBooks });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
