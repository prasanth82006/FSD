import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import BookCard from '../components/BookCard';

const Wishlist = () => {
    const { user } = useContext(AuthContext);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/users/wishlist', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setWishlist(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        if (user) fetchWishlist();
    }, [user]);

    if (!user) return <div className="p-8">Please login.</div>;
    if (loading) return <div className="p-8 text-center">Loading wishlist...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
            {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlist.map(book => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            ) : (
                <div className="p-8 text-center text-gray-500">
                    Your wishlist is empty.
                </div>
            )}
        </div>
    );
};

export default Wishlist;
