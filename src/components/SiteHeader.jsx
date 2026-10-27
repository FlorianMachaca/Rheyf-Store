export default function SiteHeader({ onNavigate, cartCount = 0 }) {
  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={() => onNavigate('home')} aria-label="Ir al inicio de Rheyf Store">
        <span className="brand-mark" aria-hidden="true">R</span>
        <span>Rheyf <strong>Store</strong></span>
      </button>
      <nav className="main-nav" aria-label="Navegación principal">
        <button type="button" onClick={() => onNavigate('home')}>Inicio</button>
        <button type="button" onClick={() => onNavigate('catalog')}>Productos</button>
        <button type="button" onClick={() => onNavigate('catalog')}>Categorías</button>
      </nav>
      <div className="header-actions">
        <button className="icon-button" type="button" aria-label="Ir a productos" onClick={() => onNavigate('catalog')}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3" /><path d="m16 16 4.5 4.5" /></svg>
        </button>
        <button className="icon-button cart-shortcut" type="button" aria-label={`Ver carrito, ${cartCount} productos`} onClick={() => onNavigate('cart')}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.1 11.1a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 1.9-1.4L21 8H6" /><circle cx="9.5" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></svg>
          <span className="cart-count">{cartCount}</span>
        </button>
      </div>
    </header>
  );
}
