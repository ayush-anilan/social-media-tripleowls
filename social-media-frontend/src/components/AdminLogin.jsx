import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
            console.log(response);

            localStorage.setItem('token', response.data.token);
            console.log('Token saved to localStorage:', response.data.token);
            navigate('/dashboard')
        } catch (error) {
            setError('Invalid username or password.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-white shadow-md rounded-lg p-6 space-y-4"
            >
                <h2 className="text-2xl font-semibold text-gray-800 text-center">Admin Login</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Username:</label>
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Password:</label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
