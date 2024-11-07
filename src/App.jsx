import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Inventory from './components/Inventory';
import LocationView from './components/LocationView';
import SmartOrganization from './components/SmartOrganization';
import ManageItems from './components/ManageItems';
import Login from './auth/Login';
import Signup from './auth/Signup';
import ProtectedRoute from './auth/ProtectedRoute';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <ProtectedRoute>
              <LandingPage />
            </ProtectedRoute>
          } />
          <Route path="/inventory" element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          } />
          <Route path="/location/:location" element={
            <ProtectedRoute>
              <LocationView />
            </ProtectedRoute>
          } />
          <Route path="/organization" element={
            <ProtectedRoute>
              <SmartOrganization />
            </ProtectedRoute>
          } />
          <Route path="/manage" element={
            <ProtectedRoute>
              <ManageItems />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;