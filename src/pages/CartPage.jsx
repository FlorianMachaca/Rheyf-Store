import CartLine from '../components/CartLine.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { formatMoney } from '../features/products/money.js';

export default function CartPage({ summary, onChange, onRemove, onNavigate }) {
  if (!summary.lines.length) return <section className="page-section"><EmptyState title="Tu carrito está vacío" action="Ver productos" onAction={() => onNavigate('catalog')}>Explora el catálogo y agrega los productos que te interesan.</EmptyState></section>;
  return <section className="page-section cart-page"><div className="page-heading"><div><p className="eyebrow">Tu selección</p><h1>Carrito de compras</h1></div></div>
    <div className="cart-layout"><div className="cart-lines">{summary.lines.map((line) => <CartLine key={line.productId} line={line} onChange={onChange} onRemove={onRemove} />)}</div>
      <aside className="order-summary"><h2>Resumen del pedido</h2><div><span>Subtotal</span><span>{formatMoney(summary.totalCents)}</span></div><div><span>Envío</span><span>Por coordinar</span></div><div className="summary-total"><strong>Total</strong><strong>{formatMoney(summary.totalCents)}</strong></div>
        <button className="button button-primary full-width" disabled={!summary.valid} onClick={() => onNavigate('confirm')}>Continuar pedido</button>
        {!summary.valid && <p className="error-text">Retira los productos no disponibles para continuar.</p>}
      </aside>
    </div>
  </section>;
}
