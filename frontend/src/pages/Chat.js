import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { ArrowLeft, Send } from 'lucide-react';

const Chat = () => {
    const { bookId, userId: otherUserId } = useParams();
    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Book Details
                const bookRes = await axios.get(`http://localhost:5000/api/books/${bookId}`);
                setBook(bookRes.data);

                // Fetch Messages
                const messagesRes = await axios.get(`http://localhost:5000/api/messages/${bookId}?otherUserId=${otherUserId}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setMessages(messagesRes.data);
                
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        if (user) fetchData();

        // Optional: Set up an interval or socket listener here for real-time updates
        const interval = setInterval(fetchData, 3000); // Polling every 3s as fallback to socket
        return () => clearInterval(interval);

    }, [bookId, otherUserId, user]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            const res = await axios.post('http://localhost:5000/api/messages', {
                bookId,
                recipientId: otherUserId,
                message: newMessage
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            
            setMessages([...messages, res.data]); // Optimistic update or use returned message
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message');
        }
    };

    if (loading) return <div className="p-8 text-center">Loading chat...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-80px)] flex flex-col">
           {/* Header with Book Info */}
           <div className="bg-white p-4 rounded-t-lg shadow-sm border-b flex items-center justify-between">
                <div className="flex items-center">
                    <Link to="/inbox" className="mr-4 text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                    {book && (
                        <div className="flex items-center">
                            <img 
                                src={book.image || 'https://placehold.co/100x150?text=Book'} 
                                alt={book.title} 
                                className="h-10 w-10 object-cover rounded mr-3"
                            />
                            <div>
                                <h2 className="font-bold text-gray-900 leading-tight">{book.title}</h2>
                                <p className="text-xs text-gray-500">Chatting about this book</p>
                            </div>
                        </div>
                    )}
                </div>
                {/* Could show other user's name here if we fetched it separately or from messages */}
           </div>

           {/* Messages Area */}
           <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
                <div className="space-y-4">
                    {messages.map((msg, index) => {
                        const isMe = msg.senderId._id === user.userId || msg.senderId === user.userId;
                        return (
                            <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[75%] rounded-lg px-4 py-2 shadow-sm ${
                                    isMe 
                                    ? 'bg-indigo-600 text-white rounded-br-none' 
                                    : 'bg-white text-gray-900 rounded-bl-none'
                                }`}>
                                    <p>{msg.message}</p>
                                    <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-indigo-200' : 'text-gray-400'}`}>
                                        {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>
           </div>

           {/* Input Area */}
           <div className="bg-white p-4 rounded-b-lg shadow-sm border-t">
               <form onSubmit={handleSendMessage} className="flex gap-2">
                   <input
                       type="text"
                       value={newMessage}
                       onChange={(e) => setNewMessage(e.target.value)}
                       placeholder="Type a message..."
                       className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                   />
                   <button 
                       type="submit"
                       className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors"
                   >
                       <Send className="h-5 w-5" />
                   </button>
               </form>
           </div>
        </div>
    );
};

export default Chat;
