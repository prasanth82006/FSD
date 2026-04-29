const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Wishlist
router.get('/wishlist', auth, userController.getWishlist);
router.post('/wishlist/add', auth, userController.addToWishlist);
router.post('/wishlist/remove', auth, userController.removeFromWishlist); // Using POST for remove as per frontend logic

// Admin Routes
router.get('/admin/users', auth, userController.getAllUsers);
router.get('/admin/stats', auth, userController.getStats);

module.exports = router;
