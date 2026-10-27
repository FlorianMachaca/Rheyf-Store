import { describe, expect, it } from 'vitest';
import { validateProductForm } from '../../src/features/products/validation.js';

const valid = { name: 'Artículo', categoryId: '1', description: 'Descripción', price: '12.90', imageDataUrl: 'data:image/png;base64,iVBORw0KGgo=' };

describe('validación del formulario', () => {
  it('acepta datos completos y precio en soles', () => expect(validateProductForm(valid)).toEqual({}));
  it('marca los campos requeridos y rechaza precios no positivos', () => {
    const errors = validateProductForm({ ...valid, name: ' ', price: '0', categoryId: '' });
    expect(errors).toMatchObject({ name: expect.any(String), price: expect.any(String), categoryId: expect.any(String) });
  });
  it('solo acepta PNG/JPG y restringe la imagen a 5 MiB', () => {
    expect(validateProductForm({ ...valid, imageDataUrl: 'data:image/gif;base64,AAAA' }).image).toBeTruthy();
    expect(validateProductForm({ ...valid, imageDataUrl: `data:image/png;base64,${'A'.repeat(7_000_001)}` }).image).toBeTruthy();
  });
});
