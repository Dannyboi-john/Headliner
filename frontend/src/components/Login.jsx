import React, { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: ''});
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(`Welcome back, ${data.user.name || 'user'}!`);
            } else {
                setMessage(data.error || `Login failed D:`);
            }
        } catch (err) {
            console.error(err);
            setMessage(`Error logging in! D:`);
        }
    };

    return (
        <div className="mt-[10%] p-[5%] border-4 border-gray-300 bg-indigo-600/40 rounded-[10px]">
            <p className="text-3xl pb-[2%]">Login</p>
            <p className="text-l pb-[5%]">Enter your username and password to access your account</p>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-rows-3">
                    <label className="pb-[8%]">Username:
                        <input 
                            className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
                            placeholder='Username' 
                            type="username" 
                            name="username" 
                            value={formData.username} 
                            onChange={handleChange} 
                            required />
                    </label>
                    <label className="pb-[8%]">Password: 
                        <input 
                            className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
                            placeholder='Password' 
                            type="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required />
                        {message && <p>{message}</p>}
                    </label>
                    <button 
                        type="submit"
                        className="text-gray-100 bg-indigo-600 hover:text-white border border-red-50 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center h-1/2">Log In</button>
                </div>
            </form>
        </div>
    );
};

export default Login;