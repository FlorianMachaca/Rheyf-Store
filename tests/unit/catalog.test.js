import { describe, expect, it } from 'vitest';
import { filterProducts } from '../../src/features/products/catalog.js';

const products = [
  { id: 1, name: 'Mochila urbana', categoryId: 1 },
  { id: 2, name: 'Camiseta básica', categoryId: 2 },
  { id: 3, name: 'Audífonos inalámbricos', categoryId: 4 },
];

describe('filterProducts', () => {
  it('busca una parte del nombre sin distinguir mayúsculas', () => {
    expect(filterProducts(products, { search: 'MOCHI' }).map((product) => product.id)).toEqual([1]);
  });

  it('filtra por categoría', () => {
    expect(filterProducts(products, { categoryId: '4' }).map((product) => product.id)).toEqual([3]);
  });

  it('combina búsqueda y categoría', () => {
    expect(filterProducts(products, { search: 'a', categoryId: '1' }).map((product) => product.id)).toEqual([1]);
  });

  it('devuelve todos los productos si la búsqueda y categoría están vacías', () => {
    expect(filterProducts(products, {}).map((product) => product.id)).toEqual([1, 2, 3]);
  });

  it('devuelve una lista vacía si no hay coincidencias', () => {
    expect(filterProducts(products, { search: 'inexistente' })).toEqual([]);
  });
});
