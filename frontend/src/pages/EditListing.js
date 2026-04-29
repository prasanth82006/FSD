import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const EditListing = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // Initial state matching the schema
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        condition: '', // No default here, will load from API
        price: '',
        description: '',
        image: '' // Stores the URL or existing image path
    });
    
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/books/${id}`);
                const book = res.data;
                
                // Security check
                if (user && book.userId._id !== user.userId) {
                    alert("You are not authorized to edit this book.");
                    navigate('/');
                    return;
                }

                setFormData({
                    title: book.title,
                    author: book.author,
                    genre: book.genre,
                    condition: book.condition,
                    price: book.price,
                    description: book.description,
                    image: book.image
                });
                setPreviewImage(book.image);
                setLoading(false);
            } catch (err) {
                setError('Failed to load book details');
                setLoading(false);
            }
        };
        if (user) fetchBook();
    }, [id, user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // This time, if no new file, we can just send JSON or keep using FormData. 
        // Using common updateBook controller which might expect JSON if no file middleware involved?
        // Wait, updateBook logic in controller reads req.body directly. 
        // If I use FormData, I need Multer on the PUT route too for it to parse fields.
        // Let's check updateBook implementation... it just does FindByIdAndUpdate(req.body). 
        // Standard express.json() middleware WON'T parse FormData.
        
        // Strategy: 
        // If image unchanged -> Send JSON.
        // If image changed -> We need backend to handle multipart/form-data on PUT.
        // Currently `updateBook` route does NOT have `upload.single('image')`.
        
        // Quick Fix: I will stick to editing PRICE and details only for now as requested?
        // User said: "edit the prize of the book... and change the image url to image selecting".
        // The image upload was for creation. For editing, usually one also wants to screen image.
        // But to make it simple and robust without breaking existing update logic:
        // I will alert user that image update is not supported here OR I will update the backend route to allow it.
        // Given I just added Multer, adding it to PUT is easy.
        
        // Let's assume for this step I will enable Multer on PUT too.
        
        const data = new FormData();
        data.append('title', formData.title);
        data.append('author', formData.author);
        data.append('genre', formData.genre);
        data.append('condition', formData.condition);
        data.append('price', formData.price);
        data.append('description', formData.description);
        if (imageFile) {
            data.append('image', imageFile);
        } else {
            // Keep existing image string if no new file
            data.append('image', formData.image);
        }

        try {
            // Note: I need to update bookRoutes.js to add upload.single('image') to PUT!
            await axios.put(`http://localhost:5000/api/books/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate(`/books/${id}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Error updating listing');
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Edit Listing</h1>
            {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
            
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Book Title</label>
                    <input type="text" name="title" required value={formData.title} onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Author</label>
                    <input type="text" name="author" required value={formData.author} onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Genre</label>
                        <select name="genre" required value={formData.genre} onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                             <option value="">Select Genre</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Non-Fiction">Non-Fiction</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Mystery">Mystery</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Textbook">Textbook</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Condition</label>
                        <select name="condition" required value={formData.condition} onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                             <option value="New">New</option>
                            <option value="Like New">Like New</option>
                            <option value="Used">Used</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                    <input type="number" name="price" required min="0" step="0.01" value={formData.price} onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700">Current Image</label>
                    {previewImage && (
                        <img src={previewImage} alt="Preview" className="mt-2 h-32 w-auto object-cover rounded" />
                    )}
                    <label className="block text-sm font-medium text-gray-700 mt-4">Change Image (Optional)</label>
                    <input type="file" name="image" accept="image/*" onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" rows="3" value={formData.description} onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                </div>

                <div className="flex justify-end space-x-4">
                     <button type="button" onClick={() => navigate(-1)}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none">
                        Cancel
                    </button>
                    <button type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Update Book
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditListing;
