import { Link } from 'react-router-dom';
import { BookOpen, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="text-purple-400" size={32} />
              <h2 className="text-2xl font-bold">Book Bazaar</h2>
            </div>
            <p className="text-gray-300 text-sm">
              Discover, exchange, and share your love for books with our community.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/my-books" className="text-gray-300 hover:text-purple-400 transition-colors">
                  My Books
                </Link>
              </li>
              <li>
                {/* <Link to="/messages" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Messages
                </Link> */}
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for the latest book recommendations and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-gray-800 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <button className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700 transition-colors">
                <Mail size={20} />
              </button>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <button className="text-gray-300 hover:text-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded">
                <Facebook size={24} />
              </button>
              <button className="text-gray-300 hover:text-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded">
                <Twitter size={24} />
              </button>
              <button className="text-gray-300 hover:text-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded">
                <Instagram size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Book Bazaar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;