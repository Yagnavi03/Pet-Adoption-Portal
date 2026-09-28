import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import PetList from './components/PetList';
import PetDetails from './components/PetDetails';
import AdoptionForm from './components/AdoptionForm';
import AdminDashboard from './components/AdminDashboard';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pets" element={<PetList />} />
            <Route path="/pets/:id" element={<PetDetails />} />
            <Route path="/adopt/:petId" element={<AdoptionForm />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
