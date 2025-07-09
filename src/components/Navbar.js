import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
  const confirmLogout = window.confirm('Are you sure you want to logout?');
  if (confirmLogout) {
    localStorage.removeItem('currentUser');
    navigate('/');
  }
};

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/dashboard">URL Shortener</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/add">Add URL</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/list">My URLs</Link>
          </li>
        </ul>
        <button className="btn btn-outline-light" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;