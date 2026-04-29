import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { MessageCircle, ArrowLeft } from 'lucide-react';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [showChat, setShowChat] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/books/${id}`);
                setBook(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/messages', {
                bookId: book._id,
                recipientId: book.userId._id,
                message
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            alert('Message sent!');
            setShowChat(false);
            navigate(`/chat/${book._id}/${book.userId._id}`); // Redirect to chat
        } catch (error) {
            alert('Error sending message');
        }
    };

    const handleBuyBook = async () => {
        if (!user) return navigate('/login');
        if (!window.confirm('Are you sure you want to buy this book?')) return;

        try {
            const res = await axios.post(`http://localhost:5000/api/books/${book._id}/buy`, {}, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            alert(res.data.message);
            setBook({ ...book, status: 'Sold', buyerId: user.userId }); // Update local state
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Error buying book');
        }
    };

    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        if (user && user.wishlist && book) {
            setIsWishlisted(user.wishlist.includes(book._id));
        }
    }, [user, book]);

    const handleWishlistToggle = async () => {
        if (!user) return navigate('/login');
        try {
            const endpoint = isWishlisted ? 'remove' : 'add';
            await axios.post(`http://localhost:5000/api/users/wishlist/${endpoint}`, { bookId: book._id }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setIsWishlisted(!isWishlisted);
            alert(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
        } catch (error) {
            alert(error.response?.data?.message || 'Error updating wishlist');
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!book) return <div className="p-8 text-center">Book not found</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Browse
            </Link>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/3">
                    <img 
                        src={book.image || 'https://placehold.co/400x600?text=Book+Cover'} 
                        alt={book.title} 
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = 'https://placehold.co/400x600?text=No+Image';
                        }}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-8 md:w-2/3">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                            <p className="text-xl text-gray-600 mb-4">{book.author}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                             <span className={`px-3 py-1 rounded-full font-medium ${book.status === 'Sold' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                {book.status || 'Available'}
                            </span>
                            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-medium">
                                {book.condition}
                            </span>
                        </div>
                    </div>

                    <div className="text-2xl font-bold text-gray-900 mb-6">${book.price}</div>

                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Genre</h3>
                        <p className="text-gray-900">{book.genre}</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Description</h3>
                        <p className="text-gray-600 mt-1">{book.description || 'No description provided.'}</p>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Seller</h3>
                        <p className="text-gray-900 mt-1">{book.userId?.username}</p>
                        {book.location && <p className="text-gray-500 text-sm">{book.location}</p>}
                    </div>

                    <div className="flex space-x-4">
                        {user && user.userId === book.userId?._id ? (
                            <Link to={`/edit-listing/${book._id}`} className="flex-1 bg-gray-200 text-gray-800 text-center py-2 rounded-md hover:bg-gray-300">
                                Edit Listing
                            </Link>
                        ) : book.status === 'Sold' ? (
                            <button disabled className="flex-1 bg-gray-400 text-white py-2 rounded-md cursor-not-allowed">
                                Sold Out
                            </button>
                        ) : (
                            <>
                                <button 
                                    onClick={handleBuyBook}
                                    className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 font-bold"
                                >
                                    Buy Now
                                </button>
                                <button 
                                    onClick={() => user ? setShowChat(!showChat) : navigate('/login')}
                                    className="flex-1 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 flex justify-center items-center"
                                >
                                    <MessageCircle className="h-5 w-5 mr-2" />
                                    Contact
                                </button>
                                <button 
                                    onClick={handleWishlistToggle}
                                    className={`flex-1 border border-gray-300 py-2 rounded-md flex justify-center items-center hover:bg-gray-50 ${isWishlisted ? 'text-red-500 border-red-200 bg-red-50' : 'text-gray-700'}`}
                                >
                                     {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                </button>
                            </>
                        )}
                    </div>

                    {showChat && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-semibold mb-2">Send Message to {book.userId?.username}</h3>
                            <textarea
                                className="w-full p-2 border rounded-md mb-2"
                                placeholder="Hi, is this still available?"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button 
                                onClick={handleSendMessage}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700"
                            >
                                Send
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
