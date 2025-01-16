import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        socialMediaHandle: '',
    });
    const [images, setImages] = useState([]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('socialMediaHandle', formData.socialMediaHandle);
        Array.from(images).forEach((file) => data.append('images', file));

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/submit`, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Submission successful!');
        } catch (error) {
            console.error('Submission failed:', error);
            alert('Failed to submit.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 space-y-4"
            >
                <h2 className="text-2xl font-semibold text-gray-800 text-center">User Submission Form</h2>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Name:</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Social Media Handle:</label>
                    <input
                        type="text"
                        name="socialMediaHandle"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Upload Images:</label>
                    <input
                        type="file"
                        name="images"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UserForm;
