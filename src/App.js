import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddUrl from './components/AddUrl';
import UrlList from './components/UrlList';
import EditUrl from './components/EditUrl';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/add"
          element={<ProtectedRoute><AddUrl /></ProtectedRoute>}
        />
        <Route
          path="/list"
          element={<ProtectedRoute><UrlList /></ProtectedRoute>}
        />
        <Route
          path="/edit/:id"
          element={<ProtectedRoute><EditUrl /></ProtectedRoute>}
        />
      </Routes>
    </Router>
  );
}

export default App;
