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
            const response = await fetch('http://localhost:5000/api/login', {
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
        <div>
            <h2>Login</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>Username: 
                    <input 
                        placeholder=' Username' 
                        type="username" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        required />
                </label>
                <label>Password: 
                    <input 
                        placeholder=' Password' 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required />
                </label>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default Login;