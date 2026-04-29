// import { MessageSquare } from 'lucide-react';

// const Messages = () => {
//   return (
//     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Messages</h2>
//       <div className="text-center py-12">
//         <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
//         <h3 className="text-xl font-medium text-gray-600 mb-2">No messages yet</h3>
//         <p className="text-gray-500">Start requesting books to begin conversations</p>
//       </div>
//     </main>
//   );
// };

// export default Messages;

// import { useState, useEffect, useRef } from 'react';
// import { MessageSquare } from 'lucide-react';
// import { useLocation } from 'react-router-dom';
// import { io } from 'socket.io-client';

// const Messages = () => {
//   const { state } = useLocation();
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const socket = useRef();
//   const userId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).userId;

//   useEffect(() => {
//     if (state?.bookId && state?.userId) {
//       socket.current = io('http://localhost:5000', {
//         auth: { token: localStorage.getItem('token') }
//       });

//       socket.current.emit('joinRoom', { bookId: state.bookId, userId: state.userId });

//       socket.current.on('receiveMessage', (msg) => {
//         setMessages((prev) => [...prev, msg]);
//       });

//       return () => socket.current?.disconnect();
//     }
//   }, [state?.bookId, state?.userId]);

//   const sendMessage = () => {
//     if (message.trim()) {
//       const recipientId = state?.recipientId;
//       socket.current.emit('sendMessage', {
//         bookId: state.bookId,
//         userId,
//         message,
//         recipientId
//       });
//       setMessages((prev) => [...prev, { userId, message, timestamp: new Date() }]);
//       setMessage('');
//     }
//   };

//   if (!state?.bookId) {
//     return (
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">Messages</h2>
//         <div className="text-center py-12">
//           <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
//           <h3 className="text-xl font-medium text-gray-600 mb-2">No messages yet</h3>
//           <p className="text-gray-500">Start requesting books to begin conversations</p>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Chat for {state?.bookTitle || 'Book'}</h2>
//       <div className="h-96 overflow-y-auto mb-4 p-4 border rounded-lg bg-gray-50">
//         {messages.map((msg, index) => (
//           <div key={index} className={`text-sm mb-2 ${msg.userId === userId ? 'text-right' : 'text-left'}`}>
//             {msg.message} ({new Date(msg.timestamp).toLocaleTimeString()})
//           </div>
//         ))}
//       </div>
//       <div className="flex space-x-2">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="flex-1 px-2 py-1 border rounded-lg"
//           placeholder="Type a message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-purple-600 text-white px-2 py-1 rounded-lg hover:bg-purple-700"
//         >
//           Send
//         </button>
//       </div>
//     </main>
//   );
// };

// export default Messages;

// import { useState, useEffect, useRef } from 'react';
// import { MessageSquare } from 'lucide-react';
// import { useLocation } from 'react-router-dom';
// import { io } from 'socket.io-client';

// const Messages = () => {
//   const { state } = useLocation();
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const socket = useRef(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       window.location.href = '/login';
//       return;
//     }

//     const userId = JSON.parse(atob(token.split('.')[1])).userId;
//     socket.current = io('http://localhost:5000', {
//       auth: { token }
//     });

//     if (state?.bookId) {
//       socket.current.emit('joinRoom', { bookId: state.bookId, userId });
//     }

//     socket.current.on('receiveMessage', (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     socket.current.on('exchangeRequest', (data) => {
//       if (data.requesterId !== userId) {
//         socket.current.emit('joinRoom', { bookId: data.bookId, userId });
//         setMessages((prev) => [...prev, {
//           userId: data.requesterId,
//           message: `New exchange request for ${data.bookTitle}`,
//           timestamp: new Date()
//         }]);
//       }
//     });

//     return () => {
//       socket.current?.disconnect();
//       socket.current = null;
//     };
//   }, [state?.bookId]);

//   const sendMessage = () => {
//     if (message.trim()) {
//       const token = localStorage.getItem('token');
//       const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;
//       const recipientId = state?.recipientId;
//       socket.current.emit('sendMessage', {
//         bookId: state.bookId,
//         userId,
//         message,
//         recipientId
//       });
//       setMessages((prev) => [...prev, { userId, message, timestamp: new Date() }]);
//       setMessage('');
//     }
//   };

//   if (!state?.bookId) {
//     return (
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">Messages</h2>
//         <div className="text-center py-12">
//           <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
//           <h3 className="text-xl font-medium text-gray-600 mb-2">No messages yet</h3>
//           <p className="text-gray-500">Start requesting books to begin conversations</p>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Chat for {state?.bookTitle || 'Book'}</h2>
//       <div className="h-96 overflow-y-auto mb-4 p-4 border rounded-lg bg-gray-50">
//         {messages.map((msg, index) => (
//           <div key={index} className={`text-sm mb-2 ${msg.userId === (localStorage.getItem('token') ? JSON.parse(atob(localStorage.getItem('token').split('.')[1])).userId : null) ? 'text-right' : 'text-left'}`}>
//             {msg.message} ({new Date(msg.timestamp).toLocaleTimeString()})
//           </div>
//         ))}
//       </div>
//       <div className="flex space-x-2">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="flex-1 px-2 py-1 border rounded-lg"
//           placeholder="Type a message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-purple-600 text-white px-2 py-1 rounded-lg hover:bg-purple-700"
//         >
//           Send
//         </button>
//       </div>
//     </main>
//   );
// };

// export default Messages;

// import { useState, useEffect, useRef } from 'react';
// import { MessageSquare } from 'lucide-react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { io } from 'socket.io-client';
// import axios from 'axios';

// const Messages = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const socket = useRef(null);
//   const token = localStorage.getItem('token');
//   const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

//   useEffect(() => {
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     socket.current = io('http://localhost:5000', {
//       auth: { token }
//     });

//     if (state?.bookId) {
//       socket.current.emit('joinRoom', { bookId: state.bookId, userId });

//       // Fetch existing messages
//       axios.get(`http://localhost:5000/api/books/messages/${state.bookId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//         .then(response => {
//           console.log('Fetched messages:', response.data); // Debug log
//           setMessages(response.data);
//         })
//         .catch(error => console.error('Error fetching messages:', error));
//     }

//     socket.current.on('receiveMessage', (msg) => {
//       console.log('Received message:', msg); // Debug log
//       setMessages((prev) => {
//         const exists = prev.some(m => m._id === msg._id || (!m._id && m.timestamp === msg.timestamp && m.message === msg.message));
//         return exists ? prev : [...prev, msg];
//       });
//     });

//     socket.current.on('exchangeRequest', (data) => {
//       if (data.requesterId !== userId) {
//         socket.current.emit('joinRoom', { bookId: data.bookId, userId });
//         setMessages((prev) => [...prev, {
//           senderId: data.requesterId,
//           message: `New exchange request for ${data.bookTitle}`,
//           timestamp: new Date()
//         }]);
//         navigate('/messages', {
//           state: { bookId: data.bookId, userId, recipientId: data.requesterId, bookTitle: data.bookTitle }
//         });
//       }
//     });

//     return () => {
//       socket.current?.disconnect();
//       socket.current = null;
//     };
//   }, [state?.bookId, navigate, token, userId]);

//   const sendMessage = () => {
//     if (message.trim()) {
//       const recipientId = state?.recipientId;
//       socket.current.emit('sendMessage', {
//         bookId: state.bookId,
//         userId,
//         message,
//         recipientId
//       });
//       setMessages((prev) => [...prev, { senderId: userId, message, timestamp: new Date() }]);
//       setMessage('');
//     }
//   };

//   if (!state?.bookId) {
//     return (
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">Messages</h2>
//         <div className="text-center py-12">
//           <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
//           <h3 className="text-xl font-medium text-gray-600 mb-2">No messages yet</h3>
//           <p className="text-gray-500">Start requesting books to begin conversations</p>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Chat for {state?.bookTitle || 'Book'}</h2>
//       <div className="h-96 overflow-y-auto mb-4 p-4 border rounded-lg bg-gray-50">
//         {messages.map((msg, index) => (
//           <div
//             key={msg._id || index} // Use _id if available, fallback to index
//             className={`text-sm mb-2 ${
//               msg.senderId === userId ? 'text-right' : 'text-left'
//             }`}
//           >
//             {msg.message} ({new Date(msg.timestamp).toLocaleTimeString()})
//           </div>
//         ))}
//       </div>
//       <div className="flex space-x-2">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="flex-1 px-2 py-1 border rounded-lg"
//           placeholder="Type a message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-purple-600 text-white px-2 py-1 rounded-lg hover:bg-purple-700"
//         >
//           Send
//         </button>
//       </div>
//     </main>
//   );
// };

// export default Messages;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';
import { Send, Loader2 } from 'lucide-react';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const socket = useRef(null);
  const messagesEndRef = useRef(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    socket.current = io('http://localhost:5000', { auth: { token } });
    if (state?.bookId) {
      socket.current.emit('joinRoom', { bookId: state.bookId, userId });
      axios
        .get(`http://localhost:5000/api/books/messages/${state.bookId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => setMessages(response.data))
        .catch(error => console.error('Error fetching messages:', error));
    }
    socket.current.on('receiveMessage', (msg) => {
      setMessages((prev) => {
        const exists = prev.some(m => m._id === msg._id || (!m._id && m.timestamp === msg.timestamp && m.message === msg.message));
        return exists ? prev : [...prev, msg];
      });
    });
    socket.current.on('exchangeRequest', (data) => {
      setMessages((prev) => [...prev, { ...data, message: `Exchange request for ${data.bookTitle} from ${data.requesterUsername}` }]);
    });
    return () => {
      socket.current?.disconnect();
      socket.current = null;
    };
  }, [state?.bookId, navigate, token, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !state?.bookId || !state?.recipientId) return;
    setIsLoading(true);
    const messageData = {
      bookId: state.bookId,
      userId,
      message: newMessage,
      recipientId: state.recipientId,
    };
    socket.current.emit('sendMessage', messageData);
    setNewMessage('');
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Messages</h2>
      {state?.bookId ? (
        <div className="bg-white shadow-lg rounded-lg p-4 h-[500px] flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Chat for {state.bookTitle}</h3>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.senderId === userId ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-3 rounded-lg ${msg.senderId === userId ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                  {msg.message}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="border-t p-4 flex items-center gap-2">
            <textarea
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              rows="2"
            />
            <button
              className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
              onClick={handleSendMessage}
              disabled={isLoading || !newMessage.trim()}
            >
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Select a book to start a conversation</p>
        </div>
      )}
    </div>
  );
};

export default Messages;