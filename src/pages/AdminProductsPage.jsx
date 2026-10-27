import { useMemo, useState } from 'react';
import ProductForm from '../components/ProductForm.jsx';
import { formatMoney } from '../features/products/money.js';
import { filterProducts } from '../features/products/catalog.js';

export default function AdminProductsPage({ products, categories, onCreate, onUpdate, onDelete, onRefresh }) {
  const [editing, setEditing] = useState(undefined);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const visibleProducts = useMemo(() => filterProducts(products, { search, categoryId }), [products, search, categoryId]);
  async function save(payload) {
    setError('');
    if (editing) await onUpdate(editing.id, payload); else await onCreate(payload);
    setEditing(undefined);
  }
  async function remove(product) {
    if (!window.confirm(`¿Eliminar ${product.name}?`)) return;
    try { await onDelete(product.id); } catch (reason) { setError(reason.message); }
  }
  return <section className="page-section admin-page"><div className="page-heading"><div><p className="eyebrow">Administración demostrativa</p><h1>Productos</h1><p className="page-subtitle">Los cambios se guardan en la base de datos local.</p></div><button className="button button-primary" onClick={() => setEditing(null)}>+ Nuevo producto</button></div>
    {error && <p className="error-text">{error}</p>}
    {editing !== undefined && <ProductForm categories={categories} product={editing} onSave={save} onCancel={() => setEditing(undefined)} />}
    <div className="catalog-controls admin-controls">
      <label className="search-field"><span className="sr-only">Buscar productos administrables</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar producto..." /></label>
      <label className="select-field"><span className="sr-only">Filtrar productos por categoría</span><select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}><option value="">Todas las categorías</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
    </div>
    <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Imagen</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Disponibilidad</th><th>Acciones</th></tr></thead><tbody>{visibleProducts.map((product) => <tr key={product.id}><td><img src={product.imageDataUrl} alt="" /></td><td>{product.name}</td><td>{product.categoryName}</td><td>{formatMoney(product.priceCents)}</td><td>{product.available ? 'Disponible' : 'No disponible'}</td><td><button className="button button-small" onClick={() => setEditing(product)}>Editar</button> <button className="button button-danger button-small" onClick={() => remove(product)}>Eliminar</button></td></tr>)}</tbody></table></div>
    {!visibleProducts.length && <p className="page-subtitle" role="status">No encontramos productos. Prueba con otro nombre o categoría.</p>}
    {!products.length && <button className="button button-secondary" onClick={onRefresh}>Actualizar lista</button>}
  </section>;
}
