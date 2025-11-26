import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddUrl() {
  const [form, setForm] = useState({ title: '', originalUrl: '' });
  const [urlCount, setUrlCount] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    const allUrls = JSON.parse(localStorage.getItem('urls')) || [];
    const userUrls = allUrls.filter(url => url.username === currentUser.username);
    setUrlCount(userUrls.length);
  }, [currentUser.username]);

  const generateShortUrl = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let short = '';
    for (let i = 0; i < 6; i++) {
      short += chars[Math.floor(Math.random() * chars.length)];
    }
    return `https://short.ly/${short}`;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    // Input validation
    if (!form.title.trim() || !form.originalUrl.trim()) {
      setError('Please fill in all fields');
      return;
    }

    // URL format validation
    try {
      new URL(form.originalUrl);
    } catch (e) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    if (urlCount >= 5) {
      setError('You have already added 5 URLs. Please delete one to add more.');
      return;
    }

    try {
      const newUrl = {
        id: Date.now(),
        username: currentUser.username,
        title: form.title.trim(),
        originalUrl: form.originalUrl.trim(),
        shortUrl: generateShortUrl(),
        createdAt: new Date().toISOString()
      };

      const allUrls = JSON.parse(localStorage.getItem('urls')) || [];
      allUrls.push(newUrl);
      localStorage.setItem('urls', JSON.stringify(allUrls));

      // Clear the form and show success message
      setForm({ title: '', originalUrl: '' });
      setError('URL added and shortened! Redirecting...');
      
      // Navigate after a short delay to show success message
      setTimeout(() => {
        navigate('/list');
      }, 1000);
      
    } catch (error) {
      console.error('Error saving URL:', error);
      setError('An error occurred while saving the URL. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add URL</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="originalUrl"
          placeholder="Original URL"
          value={form.originalUrl}
          onChange={handleChange}
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddUrl;
