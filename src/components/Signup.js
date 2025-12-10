import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if username already exists
    if (users.find(user => user.username === form.username)) {
      alert('Username already exists');
      return;
    }

    users.push(form);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful!');
    navigate('/');
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <input 
            name="username" 
            placeholder="Username" 
            onChange={handleChange} 
            required 
            className="signup-input"
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            onChange={handleChange} 
            required 
            className="signup-input"
          />
          <button type="submit" className="signup-button">Signup</button>
        </form>
        <p className="signup-footer">Already have an account? <a href="/" className="signup-link">Login here</a></p>
      </div>
    </div>
  );
}

export default Signup;
