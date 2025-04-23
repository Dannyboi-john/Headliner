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
      const res = await fetch("http://localhost:5000/api/register", {
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
      <div className="flex justify-center items-center min-h-[40%] bg-[#f4f4f4] border-[3px] border-blue-500 m-auto">
        <div className="bg-gray-500 rounded-lg p-8 w-full max-w-[400px] text-center shadow-md border-[3px] border-green-500">
          <form className="flex flex-col gap-2.5" onSubmit={handleSubmit}>
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

            <button type="submit" className="submit-button">
              Register
            </button>
          </form>

          {message && <div>{message}</div>}
        </div>
      </div>
    </>
  );
};

export default Register;
