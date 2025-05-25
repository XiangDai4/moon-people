// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NeedSupport from './pages/NeedSupport';
import ServiceDirectory from './pages/ServiceDirectory';
import ServiceDetail from './pages/ServiceDetail';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
// Import admin pages
import Categories from './pages/admin/Categories';
import Services from './pages/admin/Services';

// Import layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="container mx-auto px-4 py-6 min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route path="/need-support" element={<NeedSupport />} />
              <Route path="/services" element={<ServiceDirectory />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              
              {/* Admin Routes with Protection */}
              <Route 
                path="/admin/categories" 
                element={
                  <ProtectedRoute isAdmin={true}>
                    <Categories />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/services" 
                element={
                  <ProtectedRoute isAdmin={true}>
                    <Services />
                  </ProtectedRoute>
                } 
              />
              
              {/* This should be the last route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;