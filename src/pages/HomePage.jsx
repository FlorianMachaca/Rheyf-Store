import ProductCard from '../components/ProductCard.jsx';

const categoryIcons = {
  Accesorios: '◈',
  Ropa: '◇',
  'Cuidado personal': '✦',
  Tecnología: '⌁',
};

export default function HomePage({ products, categories, onNavigate, onChooseCategory, onOpenProduct }) {
  const featured = products.slice(0, 4);

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Calidad y estilo</p>
          <h1>Todo lo que necesitas,<br />en <span>un solo lugar</span></h1>
          <p className="hero-description">Descubre nuestra colección de productos variados con calidad y precios increíbles.</p>
          <button className="button button-primary hero-button" type="button" onClick={() => onNavigate('catalog')}>Ver productos <span aria-hidden="true">→</span></button>
          <div className="hero-benefits">
            <div><span className="benefit-icon">▣</span><span>Envíos a<br />toda la zona</span></div>
            <div><span className="benefit-icon">◇</span><span>Productos<br />de calidad</span></div>
            <div><span className="benefit-icon">⌕</span><span>Atención<br />personalizada</span></div>
          </div>
        </div>
        <button className="hero-product" type="button" onClick={() => products[0] && onOpenProduct(products[0].id)} aria-label="Ver mochila urbana">
          {products[0] && <img src={products[0].imageDataUrl} alt="Mochila urbana" />}
          <span className="hero-glow" />
        </button>
      </section>

      <section className="section-block categories-section">
        <div className="section-heading">
          <div><p className="eyebrow">Encuentra lo que buscas</p><h2>Categorías destacadas</h2></div>
          <button className="text-link" type="button" onClick={() => onNavigate('catalog')}>Ver todas <span aria-hidden="true">→</span></button>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <button className="category-tile" key={category.id} type="button" onClick={() => onChooseCategory(category.id)}>
              <span className="category-icon" aria-hidden="true">{categoryIcons[category.name] || '◇'}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section-block featured-section">
        <div className="section-heading">
          <div><p className="eyebrow">Selección para ti</p><h2>Productos destacados</h2></div>
          <button className="text-link" type="button" onClick={() => onNavigate('catalog')}>Explorar catálogo <span aria-hidden="true">→</span></button>
        </div>
        <div className="product-grid">
          {featured.map((product) => <ProductCard key={product.id} product={product} onOpen={onOpenProduct} />)}
        </div>
      </section>
    </>
  );
}
