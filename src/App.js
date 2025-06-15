// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import HomePage from './Pages/HomePage';
import Groups from './Pages/Groups';
import GroupOverview from './Pages/GroupOverview';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-900 font-sans">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/:groupId" element={<GroupOverview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;