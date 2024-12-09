
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './component/loginPage';
import RegisterPage from './component/RegisterPage';
import Dashboard from './component/Dashboard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import BookDetails from "./component/BookDetails";
const App = () => {
	
	
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />s
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/book/:id" element={<BookDetails />} />	
        <Route path="/home" element={<h1>Welcome to the Book Recommendation System</h1>} />
      </Routes>
      

      
    </Router>
  );
};

export default App;
