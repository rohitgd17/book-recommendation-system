
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './component/loginPage';
import RegisterPage from './component/RegisterPage';
import Dashboard from './component/Dashboard';

const App = () => {
	
	
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/" element={<h1>Welcome to the Book Recommendation System</h1>} />
      </Routes>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>

      
    </Router>
  );
};

export default App;
