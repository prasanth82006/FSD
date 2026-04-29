// import { BookOpen } from 'lucide-react';
// import BookCard from '../components/BookCard';
// import SearchBar from '../components/SearchBar';
// import CategoryFilter from '../components/CategoryFilter';
// import AddBookForm from '../components/AddBookForm';
// import { useState } from 'react';

// const Marketplace = ({ books, setBooks, userBooks, setUserBooks, showAddBook, setShowAddBook }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');

//   const filteredBooks = books.filter(book => {
//     const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="text-center mb-8">
//         <h2 className="text-4xl font-bold text-gray-800 mb-4">
//           Exchange Books, Share Stories
//         </h2>
//         <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//           Connect with fellow book lovers in your area and discover your next great read
//         </p>
//       </div>

//       <div className="mb-8">
//         <div className="flex flex-col md:flex-row gap-4 items-center">
//           <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//           <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {filteredBooks.map(book => (
//           <BookCard key={book._id || book.id} book={book} />
//         ))}
//       </div>

//       {filteredBooks.length === 0 && (
//         <div className="text-center py-12">
//           <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
//           <h3 className="text-xl font-medium text-gray-600 mb-2">No books found</h3>
//           <p className="text-gray-500">Try adjusting your search or filters</p>
//         </div>
//       )}

//       {showAddBook && <AddBookForm setShowAddBook={setShowAddBook} setBooks={setBooks} setUserBooks={setUserBooks} userBooks={userBooks} />}
//     </main>
//   );
// };

// export default Marketplace;

// import { BookOpen } from 'lucide-react';
// import BookCard from '../components/BookCard';
// import SearchBar from '../components/SearchBar';
// import CategoryFilter from '../components/CategoryFilter';
// import AddBookForm from '../components/AddBookForm';
// import { useState } from 'react';

// const Marketplace = ({ books, setBooks, userBooks, setUserBooks, showAddBook, setShowAddBook }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const featuredImages = [
//     'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=200&fit=crop',
//     'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=200&fit=crop',
//     'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop',
//   ];

//   const filteredBooks = books.filter(book => {
//     const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   // Simulate stats (replace with API call in production)
//   const stats = {
//     totalBooks: 1200,
//     activeUsers: 850,
//     successfulExchanges: 450,
//   };

//   return (
//     <main className="min-h-screen bg-gray-50">
//       {/* Hero Section with Stats and Carousel */}
//       <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Welcome to Book Bazaar</h1>
//           <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto">
//             Discover a thriving community of book lovers! Exchange your favorite reads and connect with others.
//           </p>

//           {/* Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
//             <div className="bg-white bg-opacity-10 p-4 rounded-lg">
//               <h3 className="text-2xl font-bold">{stats.totalBooks}+</h3>
//               <p className="text-sm">Books Available</p>
//             </div>
//             <div className="bg-white bg-opacity-10 p-4 rounded-lg">
//               <h3 className="text-2xl font-bold">{stats.activeUsers}+</h3>
//               <p className="text-sm">Active Users</p>
//             </div>
//             <div className="bg-white bg-opacity-10 p-4 rounded-lg">
//               <h3 className="text-2xl font-bold">{stats.successfulExchanges}+</h3>
//               <p className="text-sm">Successful Exchanges</p>
//             </div>
//           </div>

//           {/* Image Carousel */}
//           <div className="relative w-full max-w-4xl mx-auto overflow-hidden mb-6">
//             <div className="flex animate-scroll" style={{ animationDuration: '20s' }}>
//               {featuredImages.concat(featuredImages).map((image, index) => (
//                 <img
//                   key={index}
//                   src={image}
//                   alt={`Featured book ${index + 1}`}
//                   className="w-1/3 h-48 object-cover mx-2 rounded-lg"
//                 />
//               ))}
//             </div>
//           </div>

//           <button
//             onClick={() => setShowAddBook(true)}
//             className="bg-white text-purple-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300"
//           >
//             Add Your Book Now
//           </button>
//         </div>
//       </section>

//       {/* Filter Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
//           <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//           <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
//         </div>

//         {/* Book Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredBooks.map(book => (
//             <BookCard key={book._id || book.id} book={book} />
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredBooks.length === 0 && (
//           <div className="text-center py-16 bg-white rounded-lg shadow-md">
//             <BookOpen className="mx-auto text-gray-400 mb-4" size={64} />
//             <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Books Found</h3>
//             <p className="text-gray-500 mb-4">Try adjusting your search or filters to find your next read.</p>
//             <button
//               onClick={() => setShowAddBook(true)}
//               className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
//             >
//               Add a Book
//             </button>
//           </div>
//         )}
//       </div>

//       {showAddBook && <AddBookForm setShowAddBook={setShowAddBook} setBooks={setBooks} setUserBooks={setUserBooks} userBooks={userBooks} />}
//     </main>
//   );
// };

// export default Marketplace;


import { BookOpen } from 'lucide-react';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import AddBookForm from '../components/AddBookForm';
import { useState } from 'react';

const Marketplace = ({ books, setBooks, userBooks, setUserBooks, showAddBook, setShowAddBook, wishlist, setWishlist }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const featuredImages = [
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop',
  ];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Simulate stats (replace with API call in production)
  const stats = {
    totalBooks: 1200,
    activeUsers: 850,
    successfulExchanges: 450,
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Stats and Carousel */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Welcome to Book Bazaar</h1>
          <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto">
            Discover a thriving community of book lovers! Exchange your favorite reads and connect with others.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <h3 className="text-2xl font-bold">{stats.totalBooks}+</h3>
              <p className="text-sm">Books Available</p>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <h3 className="text-2xl font-bold">{stats.activeUsers}+</h3>
              <p className="text-sm">Active Users</p>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <h3 className="text-2xl font-bold">{stats.successfulExchanges}+</h3>
              <p className="text-sm">Successful Exchanges</p>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="relative w-full max-w-4xl mx-auto overflow-hidden mb-6">
            <div className="flex animate-scroll" style={{ animationDuration: '20s' }}>
              {featuredImages.concat(featuredImages).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Featured book ${index + 1}`}
                  className="w-1/3 h-48 object-cover mx-2 rounded-lg"
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowAddBook(true)}
            className="bg-white text-purple-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            Add Your Book Now
          </button>
        </div>
      </section>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <BookCard key={book._id || book.id} book={book} wishlist={wishlist} setWishlist={setWishlist} />
          ))}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <BookOpen className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Books Found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters to find your next read.</p>
            <button
              onClick={() => setShowAddBook(true)}
              className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
            >
              Add a Book
            </button>
          </div>
        )}
      </div>

      {showAddBook && <AddBookForm setShowAddBook={setShowAddBook} setBooks={setBooks} setUserBooks={setUserBooks} userBooks={userBooks} />}
    </main>
  );
};

export default Marketplace;