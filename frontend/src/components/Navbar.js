import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Menu, X, BookOpen, MessageCircle, Heart, User, LogOut, PlusCircle } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Poll for unread messages
  React.useEffect(() => {
    if (!user) return;
    
    const fetchUnread = async () => {
       try {
         const res = await axios.get('http://localhost:5000/api/messages/unread', {
            headers: { Authorization: `Bearer ${user.token}` }
         });
         setUnreadCount(res.data.count);
       } catch (err) {
         console.error(err);
       }
    };

    fetchUnread();
    const interval = setInterval(fetchUnread, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">Book Bazaar</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">Home</Link>
            
            {user ? (
              <>
                <Link to="/sell" className="flex items-center text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">
                  <PlusCircle className="mr-1 h-5 w-5" /> Sell
                </Link>
                <Link to="/inbox" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md font-medium relative">
                  <MessageCircle className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {unreadCount}
                    </span>
                  )}
                </Link>
                <Link to="/wishlist" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">
                  <Heart className="h-6 w-6" />
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">
                  <User className="h-6 w-6" />
                </Link>
                {user.role === 'admin' && (
                    <Link to="/admin" className="text-red-600 hover:text-red-800 px-3 py-2 rounded-md font-medium">Admin</Link>
                )}
                <button onClick={handleLogout} className="flex items-center text-gray-600 hover:text-red-600 px-3 py-2 rounded-md font-medium">
                  <LogOut className="h-6 w-6" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">Login</Link>
                <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700">Register</Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="block text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">Home</Link>
            {user ? (
              <>
                <Link to="/sell" onClick={() => setIsOpen(false)} className="block text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">Sell a Book</Link>
                <Link to="/inbox" onClick={() => setIsOpen(false)} className="block text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">Inbox</Link>
                <Link to="/wishlist" onClick={() => setIsOpen(false)} className="block text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">Wishlist</Link>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="block text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">Profile</Link>
                {user.role === 'admin' && (
                     <Link to="/admin" onClick={() => setIsOpen(false)} className="block text-red-600 hover:text-red-800 px-3 py-2 rounded-md text-base font-medium">Admin Dashboard</Link>
                )}
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block w-full text-left text-gray-600 hover:text-red-600 px-3 py-2 rounded-md text-base font-medium">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="block text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">Login</Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="block text-indigo-600 font-bold px-3 py-2 rounded-md text-base">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
