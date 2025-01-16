import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [submissions, setSubmissions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubmissions = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                // Redirect to login if token is missing
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/submissions`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSubmissions(response.data);
            } catch (error) {
                console.error('Error fetching submissions:', error);

                // Handle invalid or expired token
                if (error.response && error.response.status === 401) {
                    alert('Unauthorized! Redirecting to login.');
                    localStorage.removeItem('token'); // Clear invalid token
                    navigate('/login');
                }
            }
        };

        fetchSubmissions();
    }, [navigate]); // Ensure navigate is added as a dependency


    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {submissions.map((submission) => (
                    <div
                        key={submission._id}
                        className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {submission.name}
                        </h3>
                        <p className="text-gray-600 mb-4">
                            <span className="font-medium">Handle:</span> {submission.socialMediaHandle}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {submission.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:5000/${image}`}
                                    alt="Submission"
                                    className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
