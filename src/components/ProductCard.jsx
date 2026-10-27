import { formatMoney } from '../features/products/money.js';

export default function ProductCard({ product, onOpen, onAdd }) {
  return (
    <article className="product-card">
      <button className="product-image-button" type="button" onClick={() => onOpen(product.id)} aria-label={`Ver ${product.name}`}>
        <img className="product-image" src={product.imageDataUrl} alt={product.name} />
      </button>
      <div className="product-card-body">
        <div className="product-card-title-row">
          <button className="product-name-button" type="button" onClick={() => onOpen(product.id)}>{product.name}</button>
          <span className={`availability-dot ${product.available ? 'is-available' : 'is-unavailable'}`} title={product.available ? 'Disponible' : 'No disponible'} />
        </div>
        <p className="product-price">{formatMoney(product.priceCents)}</p>
        <p className={`stock-label ${product.available ? '' : 'muted'}`}>{product.available ? 'Disponible' : 'No disponible'}</p>
        {onAdd && <button className="button button-primary product-add" type="button" disabled={!product.available} onClick={() => onAdd(product)}>{product.available ? 'Agregar al carrito' : 'No disponible'}</button>}
      </div>
    </article>
  );
}
