import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', password: ''});
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const data = await res.json();
    
            if (res.ok) {
                setMessage(`'✅ ${data.message}'`);
                setFormData({ username: '', passowrd: '' });
            } else {
                setMessage(`❌ ${data.error}`);
            }
        } catch (err) {
            setMessage('❌ Something went wrong. Please try again.');
            console.error(err);
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="register-form"
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="register-form"
            />

            <button
                type="submit"
                className="submit-button"
            >
                Register12
            </button>
        </form>

        {message && (
            <div>
                {message}
            </div>
        )}
        </>
    )
};

export default Register;