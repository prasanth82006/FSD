import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Inbox = () => {
    const { user } = useContext(AuthContext);
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/messages', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setConversations(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        if (user) fetchConversations();
    }, [user]);

    if (loading) return <div className="p-8 text-center">Loading inbox...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Inbox</h1>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {conversations.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                        {conversations.map((conv, index) => (
                            <Link 
                                key={index} 
                                to={`/chat/${conv.book._id}/${conv.otherUser._id}`}
                                className="block p-4 hover:bg-gray-50 transition duration-150"
                            >
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 mr-4">
                                        <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                                            {conv.otherUser.username.charAt(0).toUpperCase()}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-indigo-600 truncate">
                                            {conv.book.title}
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {conv.otherUser.username}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            {conv.lastMessage}
                                        </p>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {new Date(conv.timestamp).toLocaleDateString()}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        No messages yet. Start a conversation from a book page!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inbox;
