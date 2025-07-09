import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UrlList() {
  const [urls, setUrls] = useState([]);
  const [filteredUrls, setFilteredUrls] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  const pageSize = 3;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    const allUrls = JSON.parse(localStorage.getItem('urls')) || [];
    const userUrls = allUrls.filter(url => url.username === currentUser.username);
    setUrls(userUrls);
  }, [currentUser.username]);

  useEffect(() => {
    const filtered = urls.filter(
      url =>
        url.title.toLowerCase().includes(search.toLowerCase()) ||
        url.originalUrl.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUrls(filtered);
    setPage(0); 
  }, [search, urls]);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this URL?')) return;

    const updatedUrls = urls.filter(url => url.id !== id);
    const allUrls = JSON.parse(localStorage.getItem('urls')) || [];
    const newAllUrls = allUrls.filter(
      url => !(url.id === id && url.username === currentUser.username)
    );

    localStorage.setItem('urls', JSON.stringify(newAllUrls));
    setUrls(updatedUrls);
  };

  const startIndex = page * pageSize;
  const paginatedUrls = filteredUrls.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredUrls.length / pageSize);

  return (
    <div>
      <h2>My URLs</h2>

      <input
        type="text"
        placeholder="Search by title or URL"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Created Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUrls.map((url) => (
            <tr key={url.id}>
              <td>{url.title}</td>
              <td>
                <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                  Visit
                </a>
              </td>
              <td>
                <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
  {url.shortUrl}
</a>
              </td>
              <td>{new Date(url.createdAt).toLocaleString()}</td>
              <td>
                <Link to={`/edit/${url.id}`}>Edit</Link> |{' '}
                <button onClick={() => handleDelete(url.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button disabled={page <= 0} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>
          {' '}
          Page {page + 1} of {totalPages}{' '}
        </span>
        <button disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default UrlList;
