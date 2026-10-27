import { formatMoney } from '../features/products/money.js';

export default function ProductDetailPage({ product, onBack, onAdd }) {
  if (!product) return <section className="page-section"><h1>No encontramos ese producto</h1><button className="button" onClick={onBack}>Volver al catálogo</button></section>;
  return <section className="page-section detail-layout">
    <div><img className="detail-image" src={product.imageDataUrl} alt={product.name} /></div>
    <div className="detail-copy"><p className="eyebrow">{product.categoryName}</p><h1>{product.name}</h1><p className="detail-price">{formatMoney(product.priceCents)}</p>
      <p>{product.description}</p><p className={product.available ? 'stock-label' : 'stock-label muted'}>{product.available ? 'Disponible' : 'No disponible'}</p>
      <button className="button button-primary" disabled={!product.available} onClick={() => onAdd(product)}>Agregar al carrito</button>
      <ul className="detail-points"><li>Calidad y estilo para tu día a día</li><li>Coordina tu pedido directamente por WhatsApp</li></ul>
      <button className="text-link" onClick={onBack}>← Volver al catálogo</button>
    </div>
  </section>;
}
