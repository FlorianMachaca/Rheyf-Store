import { useEffect, useState } from 'react';
import { parsePriceToCents } from '../features/products/money.js';
import { validateProductForm } from '../features/products/validation.js';

const emptyForm = { name: '', categoryId: '', description: '', price: '', available: true, imageDataUrl: '' };

export default function ProductForm({ categories, product, onSave, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    setForm(product ? { name: product.name, categoryId: String(product.categoryId), description: product.description,
      price: (product.priceCents / 100).toFixed(2), available: product.available, imageDataUrl: product.imageDataUrl } : emptyForm);
    setErrors({});
  }, [product]);

  async function chooseImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!['image/png', 'image/jpeg'].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setErrors((current) => ({ ...current, image: 'Elige un archivo PNG o JPG de hasta 5 MB.' })); return;
    }
    const imageDataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file);
    });
    setForm((current) => ({ ...current, imageDataUrl })); setErrors((current) => ({ ...current, image: '' }));
  }

  async function submit(event) {
    event.preventDefault();
    const nextErrors = validateProductForm(form); setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setBusy(true);
    try { await onSave({ name: form.name.trim(), categoryId: Number(form.categoryId), description: form.description.trim(), priceCents: parsePriceToCents(form.price), available: form.available, imageDataUrl: form.imageDataUrl }); }
    catch (error) { setErrors({ form: error.message }); }
    finally { setBusy(false); }
  }

  return <form className="product-form" onSubmit={submit} noValidate>
    <h2>{product ? 'Editar producto' : 'Nuevo producto'}</h2>
    <label>Nombre del producto<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />{errors.name && <small>{errors.name}</small>}</label>
    <label>Categoría<select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}><option value="">Selecciona una categoría</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select>{errors.categoryId && <small>{errors.categoryId}</small>}</label>
    <label>Precio (S/)<input inputMode="decimal" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="79.90" />{errors.price && <small>{errors.price}</small>}</label>
    <label>Descripción<textarea rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />{errors.description && <small>{errors.description}</small>}</label>
    <label>Imagen del producto<input type="file" accept="image/png,image/jpeg" onChange={chooseImage} />{errors.image && <small>{errors.image}</small>}{form.imageDataUrl && <img className="form-preview" src={form.imageDataUrl} alt="Vista previa del producto" />}</label>
    <label className="checkbox-label"><input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} />Disponible</label>
    {errors.form && <p className="error-text">{errors.form}</p>}
    <div className="form-actions"><button className="button button-primary" disabled={busy}>{busy ? 'Guardando…' : 'Guardar'}</button><button className="button button-secondary" type="button" onClick={onCancel}>Cancelar</button></div>
  </form>;
}
