import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_APP_API}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`'✅ ${data.message}'`);
        setFormData({ username: "", passowrd: "" });
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (err) {
      setMessage("❌ Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
      <div className="mt-[10%] p-[5%] border-4 border-gray-300 bg-indigo-600/40 rounded-[10px]">
        <p className="text-3xl pb-[2%]">Register</p>
        <p className="text-l pb-[5%]">Sign up to meet fellow musicians and become part of the local music community</p>
        <form className="flex flex-col gap-2.5" onSubmit={handleSubmit}>
          <div className="grid grid-rows-3">
            <label className="pb-[8%]">Username:
              <input
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              </label>

            <label className="pb-[8%]">Password
              <input
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            <button 
              type="submit" 
              className="text-gray-100 bg-indigo-600 hover:text-white border border-red-50 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center h-1/2">
              Register
            </button>
          </div>
        </form>

        {message && <div>{message}</div>}
      </div>
    </>
  );
};

export default Register;
