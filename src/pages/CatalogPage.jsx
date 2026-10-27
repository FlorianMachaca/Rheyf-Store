import { useMemo, useState } from 'react';
import EmptyState from '../components/EmptyState.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { filterProducts } from '../features/products/catalog.js';

export default function CatalogPage({ products, categories, onOpenProduct, onAddToCart, initialCategoryId = '' }) {
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState(initialCategoryId ? String(initialCategoryId) : '');
  const visibleProducts = useMemo(
    () => filterProducts(products, { search, categoryId }),
    [products, search, categoryId],
  );

  function resetFilters() {
    setSearch('');
    setCategoryId('');
  }

  return (
    <section className="page-section catalog-page">
      <div className="page-heading">
        <div><p className="eyebrow">Explora nuestra colección</p><h1>Catálogo de productos</h1><p className="page-subtitle">Encuentra lo que necesitas para tu día a día.</p></div>
      </div>
      <div className="catalog-controls">
        <label className="search-field">
          <span className="sr-only">Buscar productos</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3" /><path d="m16 16 4.5 4.5" /></svg>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar productos..." />
        </label>
        <label className="select-field">
          <span className="sr-only">Filtrar por categoría</span>
          <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
            <option value="">Todas las categorías</option>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
        </label>
      </div>
      {visibleProducts.length > 0 ? (
        <div className="product-grid catalog-grid">
          {visibleProducts.map((product) => <ProductCard key={product.id} product={product} onOpen={onOpenProduct} onAdd={onAddToCart} />)}
        </div>
      ) : (
        <EmptyState title="No encontramos productos" action="Limpiar filtros" onAction={resetFilters}>
          Prueba con otro nombre o muestra todas las categorías.
        </EmptyState>
      )}
    </section>
  );
}
