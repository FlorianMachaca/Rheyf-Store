import { formatMoney } from '../features/products/money.js';

export default function CartLine({ line, onChange, onRemove }) {
  const product = line.product;
  return <article className="cart-line">
    {product && <img src={product.imageDataUrl} alt="" />}
    <div className="cart-line-info"><strong>{product?.name || 'Producto eliminado'}</strong><span>{product ? formatMoney(product.priceCents) : 'Ya no está en el catálogo'}</span>
      <div className="quantity-control"><button aria-label="Reducir cantidad" onClick={() => onChange(line.productId, -1)}>−</button><span>{line.quantity}</span><button aria-label="Aumentar cantidad" onClick={() => onChange(line.productId, 1)} disabled={!line.valid}>+</button></div>
      {!line.valid && <span className="error-text">Producto no disponible. Retíralo para continuar.</span>}
    </div>
    <strong className="cart-line-total">{product ? formatMoney(line.lineTotalCents) : '—'}</strong>
    <button className="remove-button" aria-label={`Eliminar ${product?.name || 'producto'}`} onClick={() => onRemove(line.productId)}>×</button>
  </article>;
}
