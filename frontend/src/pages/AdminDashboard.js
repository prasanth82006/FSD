import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Trash2 } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ totalUsers: 0, totalBooks: 0 });
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]); // Currently admin fetches all books via public API, but could have admin specific endpoint
    const [activeTab, setActiveTab] = useState('stats');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsRes = await axios.get('http://localhost:5000/api/users/admin/stats', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setStats(statsRes.data);

                if (activeTab === 'users') {
                    const usersRes = await axios.get('http://localhost:5000/api/users/admin/users', {
                        headers: { Authorization: `Bearer ${user.token}` }
                    });
                    setUsers(usersRes.data);
                }

                if (activeTab === 'books') {
                     // Using public endpoint for now, but filtering/managed by admin
                     const booksRes = await axios.get('http://localhost:5000/api/books');
                     setBooks(booksRes.data);
                }

                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        if (user && user.role === 'admin') fetchData();
    }, [user, activeTab]);

    const handleDeleteBook = async (bookId) => {
        if (!window.confirm('Are you sure you want to delete this book?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/books/${bookId}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setBooks(books.filter(b => b._id !== bookId));
            setStats({ ...stats, totalBooks: stats.totalBooks - 1 });
        } catch (error) {
            alert('Error deleting book');
        }
    };

    if (!user || user.role !== 'admin') return <div className="p-8 text-center text-red-600">Access Denied. Admins only.</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            {/* Tabs */}
            <div className="flex space-x-4 mb-8 border-b">
                <button 
                    className={`pb-2 px-1 ${activeTab === 'stats' ? 'border-b-2 border-indigo-600 font-bold text-indigo-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('stats')}
                >
                    Overview
                </button>
                <button 
                    className={`pb-2 px-1 ${activeTab === 'users' ? 'border-b-2 border-indigo-600 font-bold text-indigo-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('users')}
                >
                    Users
                </button>
                <button 
                    className={`pb-2 px-1 ${activeTab === 'books' ? 'border-b-2 border-indigo-600 font-bold text-indigo-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('books')}
                >
                    Books
                </button>
            </div>

            {loading ? <div className="text-center">Loading...</div> : (
                <>
                    {activeTab === 'stats' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-indigo-500">
                                <h3 className="text-gray-500 text-sm font-medium uppercase">Total Users</h3>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                                <h3 className="text-gray-500 text-sm font-medium uppercase">Total Books Listed</h3>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalBooks}</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && (
                         <div className="bg-white shadow-sm overflow-hidden rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map(u => (
                                        <tr key={u._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.username}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.role}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                         </div>
                    )}

                    {activeTab === 'books' && (
                        <div className="bg-white shadow-sm overflow-hidden rounded-lg">
                             <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {books.map(b => (
                                        <tr key={b._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{b.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{b.author}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{b.userId?.username || 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${b.price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => handleDeleteBook(b._id)} className="text-red-600 hover:text-red-900">
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
export default AdminDashboard;
