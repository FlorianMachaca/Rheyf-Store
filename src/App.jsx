import { useCallback, useEffect, useMemo, useState } from 'react';
import SiteHeader from './components/SiteHeader.jsx';
import HomePage from './pages/HomePage.jsx';
import CatalogPage from './pages/CatalogPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CartPage from './pages/CartPage.jsx';
import OrderConfirmationPage from './pages/OrderConfirmationPage.jsx';
import AdminProductsPage from './pages/AdminProductsPage.jsx';
import { addToCart, changeQuantity, getCartSummary, removeFromCart } from './features/cart/cart.js';
import { createProduct, deleteProduct, getCategories, getProducts, updateProduct } from './services/productApi.js';
import { buildWhatsAppLink } from './services/whatsappLink.js';

export default function App() {
  const [page, setPage] = useState('home');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [initialCategoryId, setInitialCategoryId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const refresh = useCallback(async () => {
    setError('');
    try {
      const [nextProducts, nextCategories] = await Promise.all([getProducts(), getCategories()]);
      setProducts(nextProducts); setCategories(nextCategories);
    } catch (reason) { setError(reason.message); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { refresh(); }, [refresh]);

  const summary = useMemo(() => getCartSummary(cart, products), [cart, products]);
  const selectedProduct = products.find((product) => product.id === selectedProductId);
  const whatsappUrl = buildWhatsAppLink(import.meta.env.VITE_WHATSAPP_PHONE_NUMBER, summary.lines, summary.totalCents);

  function navigate(nextPage) { setPage(nextPage); setError(''); setNotice(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function openProduct(id) { setSelectedProductId(id); navigate('detail'); }
  function chooseCategory(id) { setInitialCategoryId(String(id)); navigate('catalog'); }
  function add(product) { setCart((current) => addToCart(current, product)); setNotice(`${product.name} se agregó al carrito.`); }
  async function reloadProducts() { await refresh(); }
  async function saveProduct(id, data) { if (id) await updateProduct(id, data); else await createProduct(data); await refresh(); }
  async function removeProduct(id) { await deleteProduct(id); setCart((current) => removeFromCart(current, id)); await refresh(); }

  return <div className="app-shell">
    <SiteHeader onNavigate={navigate} cartCount={summary.itemCount} />
    <main className="main-content">
      {notice && <div className="notice" role="status">{notice}<button onClick={() => setNotice('')} aria-label="Cerrar">×</button></div>}
      {error && <div className="error-banner" role="alert">{error}<button className="button button-secondary" onClick={reloadProducts}>Reintentar</button></div>}
      {loading ? <div className="page-section loading-state">Cargando productos…</div> : page === 'home' ? <HomePage products={products} categories={categories} onNavigate={navigate} onChooseCategory={chooseCategory} onOpenProduct={openProduct} />
        : page === 'catalog' ? <CatalogPage products={products} categories={categories} onOpenProduct={openProduct} onAddToCart={add} initialCategoryId={initialCategoryId} />
          : page === 'detail' ? <ProductDetailPage product={selectedProduct} onBack={() => navigate('catalog')} onAdd={add} />
            : page === 'cart' ? <CartPage summary={summary} onChange={(id, delta) => setCart((current) => changeQuantity(current, id, delta))} onRemove={(id) => setCart((current) => removeFromCart(current, id))} onNavigate={navigate} />
              : page === 'confirm' ? <OrderConfirmationPage summary={summary} whatsappUrl={whatsappUrl} onNavigate={navigate} />
                : page === 'admin' ? <AdminProductsPage products={products} categories={categories} onCreate={(data) => saveProduct(null, data)} onUpdate={saveProduct} onDelete={removeProduct} onRefresh={reloadProducts} />
                  : <HomePage products={products} categories={categories} onNavigate={navigate} onChooseCategory={chooseCategory} onOpenProduct={openProduct} />}
    </main>
    <footer className="site-footer"><span>Rheyf Store · Precios en soles (S/)</span><button className="text-link" onClick={() => navigate('admin')}>Administración de productos</button></footer>
  </div>;
}
