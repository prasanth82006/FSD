import { BookOpen } from 'lucide-react';
import BookCard from '../components/BookCard';
import AddBookForm from '../components/AddBookForm';

const MyBooks = ({ userBooks, setUserBooks, showAddBook, setShowAddBook, setBooks }) => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Books</h2>
      {userBooks.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-medium text-gray-600 mb-2">No books yet</h3>
          <p className="text-gray-500 mb-4">Start by adding your first book to the marketplace</p>
          <button
            onClick={() => setShowAddBook(true)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Add Your First Book
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {userBooks.map(book => (
            <BookCard key={book._id || book.id} book={book} />
          ))}
        </div>
      )}

      {showAddBook && <AddBookForm setShowAddBook={setShowAddBook} setBooks={setBooks} setUserBooks={setUserBooks} userBooks={userBooks} />}
    </main>
  );
};

export default MyBooks;