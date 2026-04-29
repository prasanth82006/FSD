import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import BookCard from '../components/BookCard';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [myBooks, setMyBooks] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch My Books
                const booksRes = await axios.get(`http://localhost:5000/api/books?userId=${user.userId}`);
                setMyBooks(booksRes.data);

                // Fetch Wishlist
                const wishlistRes = await axios.get('http://localhost:5000/api/users/wishlist', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setWishlist(wishlistRes.data);
                
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        if (user) fetchData();
    }, [user]);

    const handleDelete = async (bookId) => {
        if (!window.confirm('Are you sure you want to delete this listing?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/books/${bookId}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setMyBooks(myBooks.filter(book => book._id !== bookId));
        } catch (error) {
            console.error('Error deleting book:', error);
            alert('Failed to delete book');
        }
    };

    if (!user) return <div className="p-8">Please login.</div>;
    if (loading) return <div className="p-8 text-center">Loading profile...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Profile</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h2 className="text-xl font-semibold mb-4">Account Details</h2>
                <div className="flex items-center">
                    <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold mr-4">
                        {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                        <p className="text-lg font-medium">{user.username || 'User'}</p>
                        <p className="text-gray-500 text-sm capitalize">Role: {user.role}</p>
                    </div>
                </div>
            </div>

            {user.role === 'admin' && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 flex justify-between items-center">
                    <div>
                        <p className="font-bold text-red-700">Admin Privileges Active</p>
                        <p className="text-sm text-red-600">You have access to the platform management dashboard.</p>
                    </div>
                    <Link to="/admin" className="bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700">
                        Go to Admin Dashboard
                    </Link>
                </div>
            )}

            <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">My Listings</h2>
                {myBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {myBooks.map(book => (
                            <div key={book._id} className="relative group">
                                <BookCard book={book} />
                                <button 
                                    onClick={() => handleDelete(book._id)}
                                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
                                    title="Delete Listing"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">You haven't listed any books yet.</p>
                )}
            </div>

            <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {wishlist.map(book => (
                            <BookCard key={book._id} book={book} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">Your wishlist is empty.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
