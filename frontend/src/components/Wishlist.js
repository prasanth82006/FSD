import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import axios from 'axios';

const Wishlist = ({ wishlist, setWishlist }) => {
  const handleRemoveFromWishlist = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, please log in');
        return;
      }

      // Call the backend to remove the book from the wishlist
      await axios.delete(`http://localhost:5000/api/users/wishlist/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update the wishlist state by filtering out the removed book
      setWishlist((prev) => prev.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error('Error removing book from wishlist:', error);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <BookOpen className="mx-auto text-gray-400 mb-4" size={64} />
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">Your Wishlist is Empty</h3>
          <p className="text-gray-500 mb-4">
            Browse the marketplace to find books you'd love to read!
          </p>
          <Link
            to="/"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Explore Marketplace
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((book) => (
            <div key={book._id || book.id} className="relative">
              <BookCard book={book} />
              <button
                onClick={() => handleRemoveFromWishlist(book._id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600 text-sm"
                title="Remove from Wishlist"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Wishlist;