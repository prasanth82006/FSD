// import { useState, useEffect } from 'react';
// import { User } from 'lucide-react';
// import axios from 'axios';

// const Profile = ({ mobile }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setError('Not authenticated');
//           return;
//         }
//         const response = await axios.get('http://localhost:5000/api/auth/profile', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setUser(response.data.user);
//       } catch (err) {
//         console.error('Error fetching profile:', err);
//         setError(err.response?.data?.message || 'Failed to load profile');
//       }
//     };

//     fetchProfile();
//   }, []);

//   const toggleProfile = () => setIsOpen(!isOpen);

//   return (
//     <div className={`relative ${mobile ? 'block py-2' : 'inline-block'}`}>
//       <button
//         onClick={toggleProfile}
//         className={`flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors ${
//           mobile ? 'w-full text-left' : ''
//         }`}
//       >
//         <User size={18} />
//         <span>{mobile ? '' : ''}</span>
//       </button>

//       {isOpen && (
//         <div
//           className={`${
//             mobile
//               ? 'mt-2 p-4 bg-white shadow-md rounded-lg'
//               : 'absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-10'
//           }`}
//         >
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           {user ? (
//             <div className="text-gray-800">
//               <h3 className="font-bold text-lg mb-2">{user.username}</h3>
//               <p className="text-sm mb-1"><span className="font-medium">Email:</span> {user.email}</p>
//               <p className="text-sm"><span className="font-medium">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
//             </div>
//           ) : (
//             !error && <p className="text-gray-500 text-sm">Loading profile...</p>
//           )}
//           <button
//             onClick={toggleProfile}
//             className="mt-4 text-purple-600 hover:text-purple-800 text-sm"
//           >
//             Close
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;


import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import axios from 'axios';

const Profile = ({ mobile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Not authenticated');
          return;
        }
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data.user);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.response?.data?.message || 'Failed to load profile');
      }
    };

    fetchProfile();
  }, []);

  const toggleProfile = () => setIsOpen(!isOpen);

  return (
    <div className={`relative ${mobile ? 'block py-2' : 'inline-block'}`}>
      <button
        onClick={toggleProfile}
        className={`flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors ${
          mobile ? 'w-full text-left' : ''
        }`}
      >
        <User size={18} />
      </button>

      {isOpen && (
        <div
          className={`${
            mobile
              ? 'mt-2 p-4 bg-white shadow-md rounded-lg'
              : 'absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-10'
          }`}
        >
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {user ? (
            <div className="text-gray-800">
              <h3 className="font-bold text-lg mb-2">{user.username}</h3>
              <p className="text-sm mb-1"><span className="font-medium">Email:</span> {user.email}</p>
              <p className="text-sm"><span className="font-medium">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          ) : (
            !error && <p className="text-gray-500 text-sm">Loading...</p>
          )}
          <button
            onClick={toggleProfile}
            className="mt-4 text-purple-600 hover:text-purple-800 text-sm"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;