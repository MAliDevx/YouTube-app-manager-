import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/layout/Layout';

// Lazy load pages
import { Dashboard } from './pages/Dashboard';
import { Categories } from './pages/Categories';
import { Languages } from './pages/Languages';
import { Movies } from './pages/Movies';
import { AddMovie } from './pages/AddMovie';
import { Banners } from './pages/Banners';
import { Users } from './pages/Users';
import { UserDetails } from './pages/UserDetails';
import { Subscriptions } from './pages/Subscriptions';
import { Payments } from './pages/Payments';
import { Advertisements } from './pages/Advertisements';
import { Notifications } from './pages/Notifications';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="languages" element={<Languages />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/add" element={<AddMovie />} />
          <Route path="movies/edit/:id" element={<AddMovie />} />
          <Route path="banners" element={<Banners />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserDetails />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="payments" element={<Payments />} />
          <Route path="advertisements" element={<Advertisements />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
