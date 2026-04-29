// import { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { BookOpen, User, Plus, LogOut } from 'lucide-react';

// const Header = ({ setShowAddBook, isAuthenticated, setIsAuthenticated }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//     window.location.href = '/login';
//   };

//   return (
//     <header className="bg-white shadow-sm sticky top-0 z-40">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center py-4">
//           <div className="flex items-center space-x-3">
//             <BookOpen className="text-purple-600" size={32} />
//             <h1 className="text-2xl font-bold text-gray-800">Book Bazaar</h1>
//           </div>

//           <div className="md:hidden">
//             <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
//               </svg>
//             </button>
//           </div>

//           <nav className={`md:flex ${isOpen ? 'block' : 'hidden'} md:space-x-6 md:items-center`}>
//             <Link
//               to="/"
//               className={`font-medium transition-colors ${location.pathname === '/' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}
//             >
//               Marketplace
//             </Link>
//             {isAuthenticated && (
//               <>
//                 <Link
//                   to="/my-books"
//                   className={`font-medium transition-colors ${location.pathname === '/my-books' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}
//                 >
//                   My Books
//                 </Link>
//                 <Link
//                   to="/messages"
//                   className={`font-medium transition-colors ${location.pathname === '/messages' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}
//                 >
//                   Messages
//                 </Link>
//               </>
//             )}
//           </nav>

//           <div className="flex items-center space-x-4">
//             {isAuthenticated ? (
//               <>
//                 <button
//                   onClick={() => setShowAddBook(true)}
//                   className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
//                 >
//                   <Plus size={16} />
//                   <span>Add Book</span>
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"
//                 >
//                   <LogOut size={20} className="text-gray-600" />
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="text-gray-600 hover:text-purple-600 px-4 py-2 rounded-lg"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

// import { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { BookOpen, Plus, LogOut } from 'lucide-react';

// const Header = ({ setShowAddBook, isAuthenticated, setIsAuthenticated }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//     window.location.href = '/login';
//   };

//   return (
//     <header className="bg-white shadow-sm sticky top-0 z-40">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center py-4">
//           <div className="flex items-center space-x-3">
//             <BookOpen className="text-purple-600" size={32} />
//             <h1 className="text-2xl font-bold text-gray-800">Book Bazaar</h1>
//           </div>

//           <div className="md:hidden">
//             <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
//               </svg>
//             </button>
//           </div>

//           <nav className={`md:flex ${isOpen ? 'block' : 'hidden'} md:space-x-6 md:items-center`}>
//             <Link
//               to="/"
//               className={`font-medium transition-colors ${location.pathname === '/' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}
//             >
//               Marketplace
//             </Link>
//             {isAuthenticated && (
//               <>
//                 <Link
//                   to="/my-books"
//                   className={`font-medium transition-colors ${location.pathname === '/my-books' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}
//                 >
//                   My Books
//                 </Link>
//                 <Link
//                   to="/messages"
//                   className={`font-medium transition-colors ${location.pathname === '/messages' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}
//                 >
//                   Messages
//                 </Link>
//               </>
//             )}
//           </nav>

//           <div className="flex items-center space-x-4">
//             {isAuthenticated ? (
//               <>
//                 <button
//                   onClick={() => setShowAddBook(true)}
//                   className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
//                 >
//                   <Plus size={16} />
//                   <span>Add Book</span>
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"
//                 >
//                   <LogOut size={20} className="text-gray-600" />
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="text-gray-600 hover:text-purple-600 px-4 py-2 rounded-lg"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


// import { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { Menu, X, BookOpen, LogOut } from 'lucide-react';
// import Profile from './Profile';

// const Header = ({ setShowAddBook }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const isAuthenticated = !!localStorage.getItem('token');
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <header className="bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//         <NavLink to="/" className="flex items-center space-x-2">
//           <BookOpen className="text-purple-600" size={24} />
//           <h1 className="text-2xl font-bold text-gray-800">Book Bazaar</h1>
//         </NavLink>

//         <nav className="hidden md:flex space-x-4 items-center">
//           <NavLink to="/" className="text-gray-600 hover:text-purple-600 transition-colors">
//             Marketplace
//           </NavLink>
//           {isAuthenticated && (
//             <>
//               <NavLink to="/my-books" className="text-gray-600 hover:text-purple-600 transition-colors">
//                 My Books
//               </NavLink>
//               <NavLink to="/messages" className="text-gray-600 hover:text-purple-600 transition-colors">
//                 Messages
//               </NavLink>
//               <button
//                 onClick={() => setShowAddBook(true)}
//                 className="text-gray-600 hover:text-purple-600 transition-colors"
//               >
//                 Add Book
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="text-gray-600 hover:text-purple-600 transition-colors flex items-center"
//               >
//                 <LogOut size={18} className="mr-1" />
//                 Logout
//               </button>
//             </>
//           )}
//           {!isAuthenticated && (
//             <>
//               <NavLink to="/login" className="text-gray-600 hover:text-purple-600 transition-colors">
//                 Login
//               </NavLink>
//               <NavLink to="/register" className="text-gray-600 hover:text-purple-600 transition-colors">
//                 Register
//               </NavLink>
//             </>
//           )}
//           {isAuthenticated && <Profile />}
//         </nav>

//         <div className="md:hidden">
//           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {isMenuOpen && (
//         <nav className="md:hidden bg-white shadow-md px-4 py-2">
//           <NavLink
//             to="/"
//             className="block py-2 text-gray-600 hover:text-purple-600 transition-colors"
//             onClick={() => setIsMenuOpen(false)}
//           >
//             Marketplace
//           </NavLink>
//           {isAuthenticated && (
//             <>
//               <NavLink
//                 to="/my-books"
//                 className="block py-2 text-gray-600 hover:text-purple-600 transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 My Books
//               </NavLink>
//               <NavLink
//                 to="/messages"
//                 className="block py-2 text-gray-600 hover:text-purple-600 transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Messages
//               </NavLink>
//               <button
//                 onClick={() => {
//                   setShowAddBook(true);
//                   setIsMenuOpen(false);
//                 }}
//                 className="block py-2 text-gray-600 hover:text-purple-600 transition-colors w-full text-left"
//               >
//                 Add Book
//               </button>
//               <button
//                 onClick={() => {
//                   handleLogout();
//                   setIsMenuOpen(false);
//                 }}
//                 className="block py-2 text-gray-600 hover:text-purple-600 transition-colors w-full text-left flex items-center"
//               >
//                 <LogOut size={18} className="mr-1" />
//                 Logout
//               </button>
//             </>
//           )}
//           {!isAuthenticated && (
//             <>
//               <NavLink
//                 to="/login"
//                 className="block py-2 text-gray-600 hover:text-purple-600 transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Login
//               </NavLink>
//               <NavLink
//                 to="/register"
//                 className="block py-2 text-gray-600 hover:text-purple-600 transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Register
//               </NavLink>
//             </>
//           )}
//           {isAuthenticated && <Profile mobile />}
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Header;

// import { useState, useEffect, useRef } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { Menu, X, BookOpen, LogOut } from 'lucide-react';
// import { io } from 'socket.io-client';
// import Profile from './Profile';

// const Header = ({ setShowAddBook }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const isAuthenticated = !!localStorage.getItem('token');
//   const navigate = useNavigate();
//   const socket = useRef(null);

//   useEffect(() => {
//     if (isAuthenticated) {
//       const token = localStorage.getItem('token');
//       const userId = JSON.parse(atob(token.split('.')[1])).userId;
//       socket.current = io('http://localhost:5000', {
//         auth: { token }
//       });

//       socket.current.on('exchangeRequest', (data) => {
//         if (data.requesterId !== userId) {
//           setNotifications((prev) => [...prev, data]);
//           navigate('/messages', {
//             state: { bookId: data.bookId, userId, recipientId: data.requesterId, bookTitle: data.bookTitle }
//           });
//         }
//       });

//       return () => {
//         socket.current?.disconnect();
//         socket.current = null;
//       };
//     }
//   }, [isAuthenticated, navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <header className="bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//         <NavLink to="/" className="flex items-center space-x-2">
//           <BookOpen className="text-purple-600" size={24} />
//           <h1 className="text-2xl font-bold text-gray-800">Book Bazaar</h1>
//         </NavLink>

//         <nav className="hidden md:flex space-x-4 items-center">
//           <NavLink to="/" className="text-gray-600 hover:text-purple-600 transition-colors">
//             Marketplace
//           </NavLink>
//           {isAuthenticated && (
//             <>
//               <NavLink to="/my-books" className="text-gray-600 hover:text-purple-600 transition-colors">
//                 My Books
//               </NavLink>
//               {/* <NavLink to="/messages" className="text-gray-600 hover:text-purple-600 transition-colors relative">
//                 Messages
//                 {notifications.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
//                     {notifications.length}
//                   </span>
//                 )}
//               </NavLink> */}
//               <button
//                 onClick={() => setShowAddBook(true)}
//                 className="text-gray-600 hover:text-purple-600 transition-colors"
//               >
//                 Add Book
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="text-gray-600 hover:text-purple-600 transition-colors flex items-center"
//               >
//                 <LogOut size={18} className="mr-1" />
//                 Logout
//               </button>
//             </>
//           )}
//           {!isAuthenticated && (
//             <>
//               <NavLink to="/login" className="text-gray-600 hover:text-purple-600 transition-colors">
//                 Login
//               </NavLink>
//               <NavLink to="/register" className="text-gray-600 hover:text-purple-600 transition-colors">
//                 Register
//               </NavLink>
//             </>
//           )}
//           {isAuthenticated && <Profile />}
//         </nav>

//         <div className="md:hidden">
//           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {isMenuOpen && (
//         <nav className="md:hidden bg-white shadow-md px-4 py-2">
//           <NavLink
//             to="/"
//             className="block py-2 text-gray-600 hover:text-purple-600 transition-colors"
//             onClick={() => setIsMenuOpen(false)}
//           >
//             Marketplace
//           </NavLink>
//           {isAuthenticated && (
//             <>
//               <NavLink
//                 to="/my-books"
//                 className="block py-2 text-gray-600 hover:text-purple-600 transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 My Books
//               </NavLink>
//               <NavLink
//                 to="/messages"
//                 className="block py-2 text-gray-600 hover:text-purple-600 transition-colors relative"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Messages
//                 {notifications.length > 0 && (
//                   <span className="absolute -top-1 right-2 bg-red-500 text-white rounded-full px-2 text-xs">
//                     {notifications.length}
//                   </span>
//                 )}
//               </NavLink>
//               <button
//                 onClick={() => {
//                   setShowAddBook(true);
//                   setIsMenuOpen(false);
//                 }}
//                 className="block py-2 text-gray-600 hover:text-purple-600 transition-colors w-full text-left"
//               >
//                 Add Book
//               </button>
//               <button
//                 onClick={() => {
//                   handleLogout();
//                   setIsMenuOpen(false);
//                 }}
//                 className="block py-2 text-gray-600 hover:text-purple-600 transition-colors w-full text-left flex items-center"
//               >
//                 <LogOut size={18} className="mr-1" />
//                 Logout
//               </button>
//             </>
//           )}
//           {!isAuthenticated && (
//             <>
//               <NavLink
//                 to="/login"
//                 className="block py-2 text-gray-600 hover:text-purple-600 transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Login
//               </NavLink>
//               <NavLink
//                 to="/register"
//                 className="block py-2 text-gray-600 hover:text-purple-600 transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Register
//               </NavLink>
//             </>
//           )}
//           {isAuthenticated && <Profile mobile />}
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Header;

import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen, LogOut } from 'lucide-react';
import { io } from 'socket.io-client';
import Profile from './Profile';

const Header = ({ setShowAddBook }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isAuthenticated = !!localStorage.getItem('token');
  const navigate = useNavigate();
  const socket = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem('token');
      const userId = JSON.parse(atob(token.split('.')[1])).userId;
      socket.current = io('https://book-bazzar-backend.onrender.com', {
        auth: { token },
      });

      socket.current.on('exchangeRequest', (data) => {
        if (data.requesterId !== userId) {
          setNotifications((prev) => [...prev, data]);
          navigate('/messages', {
            state: { bookId: data.bookId, userId, recipientId: data.requesterId, bookTitle: data.bookTitle },
          });
        }
      });

      return () => {
        socket.current?.disconnect();
        socket.current = null;
      };
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsProfileOpen(true);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
    setIsProfileOpen(false);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <NavLink to="/" className="flex items-center space-x-2">
          <BookOpen className="text-purple-600" size={24} />
          <h1 className="text-2xl font-bold text-gray-800">Book Bazaar</h1>
        </NavLink>

        <nav className="hidden md:flex space-x-4 items-center">
          <NavLink to="/" className="text-gray-600 hover:text-purple-600 transition-colors">
            Marketplace
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/my-books" className="text-gray-600 hover:text-purple-600 transition-colors">
                My Books
              </NavLink>
              {/* <NavLink
                to="/messages"
                className="text-gray-600 hover:text-purple-600 transition-colors relative"
              >
                Messages
                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
                    {notifications.length}
                  </span>
                )}
              </NavLink> */}
              <NavLink to="/wishlist" className="hover:text-gray-200">Wishlist</NavLink>
              <button
                onClick={() => setShowAddBook(true)}
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Add Book
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-purple-600 transition-colors flex items-center"
              >
                <LogOut size={18} className="mr-1" />
                Logout
              </button>
              <Profile
                anchorEl={anchorEl}
                open={isProfileOpen}
                onClose={handleProfileClose}
                mobile={false}
              />
            </>
          )}
          {!isAuthenticated && (
            <>
              <NavLink to="/login" className="text-gray-600 hover:text-purple-600 transition-colors">
                Login
              </NavLink>
              <NavLink to="/register" className="text-gray-600 hover:text-purple-600 transition-colors">
                Register
              </NavLink>
            </>
          )}
        </nav>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden bg-white shadow-md px-4 py-2">
          <NavLink
            to="/"
            className="block py-2 text-gray-600 hover:text-purple-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Marketplace
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink
                to="/my-books"
                className="block py-2 text-gray-600 hover:text-purple-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                My Books
              </NavLink>
              <NavLink to="/wishlist" className="block py-2 hover:text-gray-200" onClick={() => setIsMenuOpen(false)}>Wishlist</NavLink>
              <NavLink
                to="/messages"
                className="block py-2 text-gray-600 hover:text-purple-600 transition-colors relative"
                onClick={() => setIsMenuOpen(false)}
              >
                Messages
                {notifications.length > 0 && (
                  <span className="absolute -top-1 right-2 bg-red-500 text-white rounded-full px-2 text-xs">
                    {notifications.length}
                  </span>
                )}
              </NavLink>
              <button
                onClick={() => {
                  setShowAddBook(true);
                  setIsMenuOpen(false);
                }}
                className="block py-2 text-gray-600 hover:text-purple-600 transition-colors w-full text-left"
              >
                Add Book
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block py-2 text-gray-600 hover:text-purple-600 transition-colors w-full text-left flex items-center"
              >
                <LogOut size={18} className="mr-1" />
                Logout
              </button>
              <button
                onClick={handleProfileClick}
                className="block py-2 text-gray-600 hover:text-purple-600 transition-colors w-full text-left"
              >
                Profile
              </button>
              <Profile
                anchorEl={anchorEl}
                open={isProfileOpen}
                onClose={handleProfileClose}
                mobile={true}
              />
            </>
          )}
          {!isAuthenticated && (
            <>
              <NavLink
                to="/login"
                className="block py-2 text-gray-600 hover:text-purple-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="block py-2 text-gray-600 hover:text-purple-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;