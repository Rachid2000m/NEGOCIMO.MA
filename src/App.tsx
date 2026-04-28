/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/layout/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Sectors from './pages/Sectors';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Configurator from './pages/Configurator';
import { useSettingsStore } from './store/useSettingsStore';
import { useProductsStore } from './store/useProductsStore';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminSettings from './pages/admin/Settings';
import AdminGuard from './components/AdminGuard';

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col relative">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  const initSettings = useSettingsStore(state => state.init);
  const initProducts = useProductsStore(state => state.init);
  const settings = useSettingsStore(state => state.settings);

  useEffect(() => {
    const unsubSettings = initSettings();
    const unsubProducts = initProducts();
    return () => {
        unsubSettings();
        unsubProducts();
    };
  }, [initSettings, initProducts]);

  return (
    <>
      <style>
        {`
          :root {
            ${settings?.primaryColor ? `--primary-custom: ${settings.primaryColor};` : ''}
            ${settings?.secondaryColor ? `--secondary-custom: ${settings.secondaryColor};` : ''}
            ${settings?.backgroundColor ? `--background-custom: ${settings.backgroundColor};` : ''}
            ${settings?.textColor ? `--text-custom: ${settings.textColor};` : ''}
            ${settings?.headingColor ? `--heading-custom: ${settings.headingColor};` : ''}
          }
        `}
      </style>
      <Routes>
        <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/catalogue" element={<Catalog />} />
        <Route path="/catalogue/:slug" element={<ProductDetail />} />
        <Route path="/secteurs/:slug" element={<Sectors />} />
        <Route path="/realisations" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/configurateur" element={<Configurator />} />
      </Route>

      <Route path="/admin" element={<AdminGuard />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>
    </Routes>
    </>
  );
}
