import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import AdminRoute from './components/AdminRoute';
import Layout from './components/Layout';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import About from './sections/About';
import Contact from './sections/Contact';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProjectDetails from './pages/ProjectDetails';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={
              <Layout>
                <Hero />
                <Projects />
                <Skills />
                <About />
                <Contact />
              </Layout>
            } />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/admin">
              <Route path="login" element={<Login />} />
              <Route path="dashboard" element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              } />
              <Route index element={<Navigate to="/admin/login\" replace />} />
            </Route>
            <Route path="*" element={<Navigate to="/\" replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;