import CartLine from '../components/CartLine.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { formatMoney } from '../features/products/money.js';

export default function CartPage({ summary, whatsappUrl, onChange, onRemove, onNavigate }) {
  if (!summary.lines.length) {
    return (
      <section className="page-section">
        <EmptyState title="Tu carrito está vacío" action="Ver productos" onAction={() => onNavigate('catalog')}>
          No puedes confirmar un pedido con el carrito vacío. Agrega productos para continuar.
        </EmptyState>
      </section>
    );
  }

  return (
    <section className="page-section cart-page">
      <div className="page-heading"><div><p className="eyebrow">Tu selección</p><h1>Carrito de compras</h1></div></div>
      <div className="cart-layout">
        <div className="cart-lines">
          {summary.lines.map((line) => <CartLine key={line.productId} line={line} onChange={onChange} onRemove={onRemove} />)}
        </div>
        <aside className="order-summary">
          <h2>Resumen del pedido</h2>
          <div><span>Subtotal</span><span>{formatMoney(summary.totalCents)}</span></div>
          <div><span>Entrega</span><span>Por coordinar</span></div>
          <div className="summary-total"><strong>Total</strong><strong>{formatMoney(summary.totalCents)}</strong></div>
          {summary.valid && whatsappUrl
            ? <a className="button button-whatsapp full-width" href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => onNavigate('confirm')}>Confirmar pedido por WhatsApp</a>
            : <button className="button button-whatsapp full-width" disabled>Confirmar pedido por WhatsApp</button>}
          {!summary.valid && <p className="error-text" role="alert">Retira los productos no disponibles para confirmar el pedido.</p>}
          {summary.valid && !whatsappUrl && <p className="error-text" role="alert">Revisa el número peruano de WhatsApp en la configuración de la tienda.</p>}
        </aside>
      </div>
    </section>
  );
}
