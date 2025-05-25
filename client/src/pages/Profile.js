// client/src/pages/Profile.js
import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';

const Profile = () => {
  const { user, updateProfile, loading, error: contextError } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    city: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // Populate form with user data when component mounts
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        city: user.city || '',
        password: '',
        confirmPassword: ''
      });
    }
  }, [user]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validate passwords match if provided
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      // Only include password if provided
      const updateData = {
        fullName: formData.fullName,
        email: formData.email,
        city: formData.city
      };
      
      if (formData.password) {
        updateData.password = formData.password;
      }
      
      await updateProfile(updateData);
      setSuccess('Profile updated successfully');
      setIsEditing(false);
      
      // Clear passwords
      setFormData({
        ...formData,
        password: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {contextError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {contextError}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      {!isEditing ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <h2 className="text-sm text-gray-500 uppercase">Full Name</h2>
            <p className="text-lg">{user?.fullName}</p>
          </div>
          
          <div className="mb-4">
            <h2 className="text-sm text-gray-500 uppercase">Email</h2>
            <p className="text-lg">{user?.email}</p>
          </div>
          
          <div className="mb-4">
            <h2 className="text-sm text-gray-500 uppercase">City</h2>
            <p className="text-lg">{user?.city || 'Not specified'}</p>
          </div>
          
          <div className="mb-4">
            <h2 className="text-sm text-gray-500 uppercase">Role</h2>
            <p className="text-lg capitalize">{user?.role}</p>
          </div>
          
          <button
            onClick={() => setIsEditing(true)}
            className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label htmlFor="fullName" className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label htmlFor="city" className="block mb-1 font-medium">City</label>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">New Password (Leave blank to keep current)</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 font-medium">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength="6"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                // Reset form to current user data
                if (user) {
                  setFormData({
                    fullName: user.fullName || '',
                    email: user.email || '',
                    city: user.city || '',
                    password: '',
                    confirmPassword: ''
                  });
                }
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;