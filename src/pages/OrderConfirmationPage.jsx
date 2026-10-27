import { formatMoney } from '../features/products/money.js';

export default function OrderConfirmationPage({ summary, whatsappUrl, onNavigate }) {
  if (!summary.valid) {
    return (
      <section className="page-section">
        <h1>Revisa tu carrito</h1>
        <p role="alert">Agrega productos disponibles para preparar el pedido.</p>
        <button className="button button-primary" onClick={() => onNavigate('cart')}>Volver al carrito</button>
      </section>
    );
  }

  return (
    <section className="confirmation-card">
      <div className="confirmation-check" aria-hidden="true">✓</div>
      <h1>¡Pedido listo!</h1>
      <p>Revisa el resumen. WhatsApp abrirá el chat para coordinar la entrega; el mensaje solo se envía si lo confirmas allí.</p>
      <div className="confirmation-lines">
        {summary.lines.map((line) => (
          <div className="confirmation-product" key={line.productId}>
            <span>{line.product.name} · Cantidad: {line.quantity} · Unitario: {formatMoney(line.product.priceCents)}</span>
            <span>{formatMoney(line.lineTotalCents)}</span>
          </div>
        ))}
        <div><span>Subtotal</span><span>{formatMoney(summary.totalCents)}</span></div>
        <strong><span>Total</span><span>{formatMoney(summary.totalCents)}</span></strong>
      </div>
      {whatsappUrl
        ? <a className="button button-whatsapp full-width" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Pedir por WhatsApp</a>
        : <p className="error-text" role="alert">Revisa el número peruano de WhatsApp en la configuración de la tienda.</p>}
      <p className="fine-print">Si WhatsApp no se abre, intenta desde un dispositivo con WhatsApp. Puedes revisar y editar el mensaje antes de enviarlo.</p>
      <button className="button button-secondary" onClick={() => onNavigate('catalog')}>Seguir comprando</button>
    </section>
  );
}
