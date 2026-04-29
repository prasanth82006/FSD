// import { useState } from 'react';
// import axios from 'axios';

// const AddBookForm = ({ setShowAddBook, setBooks, setUserBooks, userBooks }) => {
//   const categories = ['fiction', 'non-fiction', 'fantasy', 'mystery', 'romance', 'science'];
//   const [formData, setFormData] = useState({
//     title: '',
//     author: '',
//     category: 'fiction',
//     condition: 'good',
//     description: '',
//     location: ''
//   });
//   const [error, setError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async () => {
//     if (!formData.title.trim() || !formData.author.trim() || !formData.location.trim()) {
//       setError('Title, Author, and Location are required fields.');
//       return;
//     }

//     setError('');
//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('You must be logged in to add a book.');
//         return;
//       }

//       const newBook = {
//         ...formData,
//         image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop"
//       };
//       const response = await axios.post('http://localhost:5000/api/books', newBook, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setBooks(prev => [...prev, response.data]);
//       setUserBooks([...userBooks, response.data]);
//       setShowAddBook(false);
//       setFormData({
//         title: '',
//         author: '',
//         category: 'fiction',
//         condition: 'good',
//         description: '',
//         location: ''
//       });
//     } catch (error) {
//       console.error('Error adding book:', error);
//       setError(error.response?.data?.message || 'Failed to add book. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (error) setError('');
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold text-gray-800">Add New Book</h2>
//           <button
//             onClick={() => setShowAddBook(false)}
//             className="text-gray-500 hover:text-gray-700 text-xl"
//             aria-label="Close"
//           >
//             ×
//           </button>
//         </div>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
//             {error}
//           </div>
//         )}

//         <div className="space-y-4">
//           <div>
//             <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//             <input
//               id="title"
//               name="title"
//               type="text"
//               required
//               value={formData.title}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               placeholder="Enter book title"
//             />
//           </div>

//           <div>
//             <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Author</label>
//             <input
//               id="author"
//               name="author"
//               type="text"
//               required
//               value={formData.author}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               placeholder="Enter author name"
//             />
//           </div>

//           <div>
//             <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//             <select
//               id="category"
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             >
//               {categories.map(cat => (
//                 <option key={cat} value={cat}>
//                   {cat.charAt(0).toUpperCase() + cat.slice(1)}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
//             <select
//               id="condition"
//               name="condition"
//               value={formData.condition}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             >
//               <option value="excellent">Excellent</option>
//               <option value="good">Good</option>
//               <option value="fair">Fair</option>
//             </select>
//           </div>

//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows="3"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               placeholder="Describe the book"
//             />
//           </div>

//           <div>
//             <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//             <input
//               id="location"
//               name="location"
//               type="text"
//               required
//               value={formData.location}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               placeholder="City, State"
//             />
//           </div>

//           <div className="flex space-x-3 pt-4">
//             <button
//               type="button"
//               onClick={() => setShowAddBook(false)}
//               className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={handleSubmit}
//               className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-400"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? 'Adding...' : 'Add Book'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddBookForm;


// import { useState } from 'react';
// import axios from 'axios';

// const AddBookForm = ({ setShowAddBook, setBooks, setUserBooks, userBooks }) => {
//   const categories = ['fiction', 'non-fiction', 'fantasy', 'mystery', 'romance', 'science'];
//   const [formData, setFormData] = useState({
//     title: '',
//     author: '',
//     category: 'fiction',
//     condition: 'good',
//     description: '',
//     location: '',
//     image: null
//   });
//   const [error, setError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async () => {
//     if (!formData.title.trim() || !formData.author.trim() || !formData.location.trim()) {
//       setError('Title, Author, and Location are required fields.');
//       return;
//     }

//     setError('');
//     setIsSubmitting(true);

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('You must be logged in to add a book.');
//         return;
//       }

//       const formDataToSend = new FormData();
//       formDataToSend.append('title', formData.title);
//       formDataToSend.append('author', formData.author);
//       formDataToSend.append('category', formData.category);
//       formDataToSend.append('condition', formData.condition);
//       formDataToSend.append('description', formData.description);
//       formDataToSend.append('location', formData.location);
//       if (formData.image) {
//         formDataToSend.append('image', formData.image);
//       } else {
//         formDataToSend.append('image', "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop");
//       }

//       const response = await axios.post('http://localhost:5000/api/books', formDataToSend, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       setBooks(prev => [...prev, response.data]);
//       setUserBooks([...userBooks, response.data]);
//       setShowAddBook(false);
//       setFormData({
//         title: '',
//         author: '',
//         category: 'fiction',
//         condition: 'good',
//         description: '',
//         location: '',
//         image: null
//       });
//     } catch (error) {
//       console.error('Error adding book:', error);
//       setError(error.response?.data?.message || 'Failed to add book. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'image') {
//       setFormData(prev => ({ ...prev, image: files[0] }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//     if (error) setError('');
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold text-gray-800">Add New Book</h2>
//           <button
//             onClick={() => setShowAddBook(false)}
//             className="text-gray-500 hover:text-gray-700 text-xl"
//             aria-label="Close"
//           >
//             ×
//           </button>
//         </div>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
//             {error}
//           </div>
//         )}

//         <div className="space-y-4">
//           <div>
//             <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//             <input
//               id="title"
//               name="title"
//               type="text"
//               required
//               value={formData.title}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               placeholder="Enter book title"
//             />
//           </div>

//           <div>
//             <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Author</label>
//             <input
//               id="author"
//               name="author"
//               type="text"
//               required
//               value={formData.author}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               placeholder="Enter author name"
//             />
//           </div>

//           <div>
//             <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//             <select
//               id="category"
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             >
//               {categories.map(cat => (
//                 <option key={cat} value={cat}>
//                   {cat.charAt(0).toUpperCase() + cat.slice(1)}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
//             <select
//               id="condition"
//               name="condition"
//               value={formData.condition}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             >
//               <option value="excellent">Excellent</option>
//               <option value="good">Good</option>
//               <option value="fair">Fair</option>
//             </select>
//           </div>

//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows="3"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               placeholder="Describe the book"
//             />
//           </div>

//           <div>
//             <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//             <input
//               id="location"
//               name="location"
//               type="text"
//               required
//               value={formData.location}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               placeholder="City, State"
//             />
//           </div>

//           <div>
//             <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Book Image</label>
//             <input
//               id="image"
//               name="image"
//               type="file"
//               accept="image/*"
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             />
//           </div>

//           <div className="flex space-x-3 pt-4">
//             <button
//               type="button"
//               onClick={() => setShowAddBook(false)}
//               className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={handleSubmit}
//               className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-400"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? 'Adding...' : 'Add Book'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddBookForm;


import { useState } from 'react';
import axios from 'axios';

const AddBookForm = ({ setShowAddBook, setBooks, setUserBooks, userBooks }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'fiction',
    condition: 'excellent',
    description: '',
    location: '',
    image: null,
    costPrice: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (name === 'costPrice') {
      const numericValue = value.replace(/[^0-9.]/g, '');
      if (numericValue === '' || parseFloat(numericValue) >= 0) {
        setFormData({ ...formData, [name]: numericValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!formData.title || !formData.author || !formData.location) {
      setError('Title, author, and location are required.');
      setIsSubmitting(false);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to add a book.');
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('author', formData.author);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('condition', formData.condition);
    formDataToSend.append('description', formData.description || '');
    formDataToSend.append('location', formData.location);
    formDataToSend.append('costPrice', formData.costPrice || '0');
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    } else {
      formDataToSend.append('image', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop');
    }

    try {
      const response = await axios.post('http://localhost:5000/api/books', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setBooks((prevBooks) => [...prevBooks, response.data]);
      setUserBooks((prevUserBooks) => [...prevUserBooks, response.data]);
      setShowAddBook(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add book.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Add a Book</h2>
        {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Author *</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="fantasy">Fantasy</option>
              <option value="mystery">Mystery</option>
              <option value="romance">Romance</option>
              <option value="science">Science</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Condition</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cost Price (in $)</label>
            <input
              type="text"
              name="costPrice"
              value={formData.costPrice}
              onChange={handleChange}
              placeholder="e.g., 10.99"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowAddBook(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;