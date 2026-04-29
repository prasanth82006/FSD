import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative group">
      <img 
        src={book.image || 'https://placehold.co/300x400?text=Book+Image'} 
        alt={book.title} 
        onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://placehold.co/300x400?text=No+Image';
        }}
        className="w-full h-48 object-cover"
      />
      


      <div className="p-4">
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900 truncate" title={book.title}>{book.title}</h3>
            <div className="flex space-x-1">
                <span className={`text-xs px-2 py-1 rounded-full ${book.status === 'Sold' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {book.status || 'Available'}
                </span>
                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">{book.condition}</span>
            </div>
        </div>
        <p className="text-gray-600 text-sm mb-2">{book.author}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-gray-900">${book.price}</span>
          <Link 
            to={`/books/${book._id}`} 
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            View Details
          </Link>
        </div>
        <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
            <span>{book.genre}</span>
            <span>{book.userId?.username || 'Seller'}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;