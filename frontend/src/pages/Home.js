import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import { Search, Star, Shield, Heart } from 'lucide-react';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState({ genre: '', condition: '' });

    const fetchBooks = React.useCallback(async () => {
        try {
            // Build query params
            const params = {};
            if (searchTerm) params.search = searchTerm;
            if (filter.genre) params.genre = filter.genre;
            if (filter.condition) params.condition = filter.condition;

            const res = await axios.get('http://localhost:5000/api/books', { params });
            setBooks(res.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching books', error);
            setLoading(false);
        }
    }, [searchTerm, filter]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchBooks();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* New Hero Section - Modern & Clean */}
            <div className="relative bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                            <polygon points="50,0 100,0 50,100 0,100" />
                        </svg>

                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">Give your old books</span>{' '}
                                    <span className="block text-indigo-600 xl:inline">a new story</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Join thousands of book lovers in the most sustainable way to read. Buy, sell, and exchange books within your community.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <button onClick={() => document.getElementById('browse-books').scrollIntoView({ behavior: 'smooth' })} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg">
                                            Start Browsing
                                        </button>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg">
                                            Sell a Book
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Trust Badges */}
                                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
                                    <div className="flex flex-col items-center lg:items-start">
                                        <div className="flex items-center text-indigo-600 mb-1">
                                            <Shield className="h-5 w-5 mr-1" />
                                            <span className="font-bold">Secure</span>
                                        </div>
                                        <span className="text-xs text-gray-500">Verified Users</span>
                                    </div>
                                    <div className="flex flex-col items-center lg:items-start">
                                        <div className="flex items-center text-indigo-600 mb-1">
                                            <Heart className="h-5 w-5 mr-1" />
                                            <span className="font-bold">Community</span>
                                        </div>
                                        <span className="text-xs text-gray-500">Book Lovers</span>
                                    </div>
                                    <div className="flex flex-col items-center lg:items-start">
                                        <div className="flex items-center text-indigo-600 mb-1">
                                            <Star className="h-5 w-5 mr-1" />
                                            <span className="font-bold">Quality</span>
                                        </div>
                                        <span className="text-xs text-gray-500">Curated Books</span>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop" alt="Library shelves" />
                    <div className="absolute inset-0 bg-indigo-900 opacity-20 mix-blend-multiply lg:hidden"></div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="browse-books">
                {/* Search and Filters Header */}
                <div className="flex flex-col lg:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Latest Collections</h2>
                        <p className="mt-1 text-gray-500">Freshly added books from readers near you</p>
                    </div>
                    {/* Search & Filters */}
                    <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
                         <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search books..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                            />
                        </div>
                        <select
                            className="p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                            value={filter.genre}
                            onChange={(e) => setFilter({ ...filter, genre: e.target.value })}
                        >
                            <option value="">All Genres</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Non-Fiction">Non-Fiction</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Mystery">Mystery</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Textbook">Textbook</option>
                        </select>
                        <select
                            className="p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                            value={filter.condition}
                            onChange={(e) => setFilter({ ...filter, condition: e.target.value })}
                        >
                            <option value="">Any Condition</option>
                            <option value="New">New</option>
                            <option value="Like New">Like New</option>
                            <option value="Used">Used</option>
                        </select>
                    </div>
                </div>

            {/* Book Grid */}
            {loading ? (
                <div className="text-center text-gray-500">Loading books...</div>
            ) : books.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {books.map(book => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 py-12">
                    <p className="text-xl">No books found matching your criteria.</p>
                </div>
            )}
        </div>
    </div>
    );
};

export default Home;
