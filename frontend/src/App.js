import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import BookDetails from './pages/BookDetails';
import Profile from './pages/Profile';
import Inbox from './pages/Inbox';
import Wishlist from './pages/Wishlist';
import AdminDashboard from './pages/AdminDashboard';
import Chat from './pages/Chat';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/sell" element={
                <PrivateRoute>
                  <CreateListing />
                </PrivateRoute>
              } />

              <Route path="/edit-listing/:id" element={
                <PrivateRoute>
                  <EditListing />
                </PrivateRoute>
              } />
              
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
              
              <Route path="/inbox" element={
                <PrivateRoute>
                  <Inbox />
                </PrivateRoute>
              } />
              <Route path="/chat/:bookId/:userId" element={
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              } />
              
              <Route path="/wishlist" element={
                <PrivateRoute>
                  <Wishlist />
                </PrivateRoute>
              } />

              <Route path="/admin" element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              } />
            </Routes>
          </main>
          <footer className="bg-white border-t p-4 text-center text-gray-500">
            &copy; 2025 Book Bazaar. All rights reserved.
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;