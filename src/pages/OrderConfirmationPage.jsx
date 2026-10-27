import { formatMoney } from '../features/products/money.js';

export default function OrderConfirmationPage({ summary, whatsappUrl, onNavigate }) {
  if (!summary.valid) return <section className="page-section"><h1>Revisa tu carrito</h1><p>Agrega productos disponibles para preparar el pedido.</p><button className="button button-primary" onClick={() => onNavigate('cart')}>Volver al carrito</button></section>;
  return <section className="confirmation-card"><div className="confirmation-check">✓</div><h1>¡Pedido listo!</h1><p>Revisa el resumen y continúa en WhatsApp para confirmar disponibilidad y coordinar los detalles.</p>
    <div className="confirmation-lines">{summary.lines.map((line) => <div key={line.productId}><span>{line.product.name} x{line.quantity}</span><span>{formatMoney(line.lineTotalCents)}</span></div>)}<strong><span>Total</span><span>{formatMoney(summary.totalCents)}</span></strong></div>
    {whatsappUrl ? <a className="button button-whatsapp full-width" href={whatsappUrl} target="_blank" rel="noreferrer">◉ Enviar pedido por WhatsApp</a> : <p className="error-text">Configura el número internacional de WhatsApp en `.env` para habilitar el enlace.</p>}
    <p className="fine-print">Se abrirá WhatsApp con el detalle editable. El mensaje solo se envía si tú lo confirmas en esa aplicación. Si no se abre, intenta desde un dispositivo con WhatsApp.</p><button className="button button-secondary" onClick={() => onNavigate('catalog')}>Seguir comprando</button>
  </section>;
}
