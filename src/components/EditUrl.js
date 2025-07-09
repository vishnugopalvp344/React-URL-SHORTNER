import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditUrl() {
  const { id } = useParams(); 
  const [form, setForm] = useState({ title: '', originalUrl: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    const allUrls = JSON.parse(localStorage.getItem('urls')) || [];
    const urlToEdit = allUrls.find(
      url => url.id === parseInt(id) && url.username === currentUser.username
    );

    if (urlToEdit) {
      setForm({ title: urlToEdit.title, originalUrl: urlToEdit.originalUrl });
    } else {
      setError('URL not found or unauthorized');
    }
  }, [id, currentUser.username]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allUrls = JSON.parse(localStorage.getItem('urls')) || [];

    const index = allUrls.findIndex(
      url => url.id === parseInt(id) && url.username === currentUser.username
    );

    if (index !== -1) {
      allUrls[index] = {
        ...allUrls[index],
        title: form.title,
        originalUrl: form.originalUrl
      };

      localStorage.setItem('urls', JSON.stringify(allUrls));
      alert('URL updated successfully!');
      navigate('/list');
    } else {
      setError('Update failed: URL not found');
    }
  };

  return (
    <div>
      <h2>Edit URL</h2>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditUrl;