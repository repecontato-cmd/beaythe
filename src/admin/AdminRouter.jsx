import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminLayout from './layouts/AdminLayout';
import Orders from './pages/Orders';
import Products from './pages/Products';
import SEO from './pages/SEO';

export default function AdminRouter() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<AdminLayout />}>
                <Route index element={<Orders />} />
                <Route path="produtos" element={<Products />} />
                <Route path="seo" element={<SEO />} />
            </Route>
        </Routes>
    );
}
