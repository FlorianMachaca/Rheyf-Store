import { afterEach, describe, expect, it } from 'vitest';
import { createApp } from '../../server/app.js';
import { createDatabase } from '../../server/database.js';

let server;
let database;

async function startApp() {
  database = createDatabase(':memory:');
  server = createApp(database).listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));
  const address = server.address();
  return `http://127.0.0.1:${address.port}`;
}

afterEach(async () => {
  if (server) await new Promise((resolve) => server.close(resolve));
  if (database) database.close();
  server = undefined;
  database = undefined;
});

describe('API inicial del catálogo', () => {
  it('devuelve las cuatro categorías y seis productos del prototipo', async () => {
    const baseUrl = await startApp();
    const [categoriesResponse, productsResponse] = await Promise.all([
      fetch(`${baseUrl}/api/categories`),
      fetch(`${baseUrl}/api/products`),
    ]);

    expect(categoriesResponse.status).toBe(200);
    expect((await categoriesResponse.json()).map((category) => category.name)).toEqual([
      'Accesorios', 'Ropa', 'Cuidado personal', 'Tecnología',
    ]);
    expect(productsResponse.status).toBe(200);
    const products = await productsResponse.json();
    expect(products).toHaveLength(6);
    expect(products[0]).toMatchObject({ name: 'Mochila urbana', priceCents: 7990, available: true });
    expect(products[0].imageDataUrl).toMatch(/^data:image\/png;base64,/);
  });

  it('filtra por nombre y categoría con los parámetros de la solicitud', async () => {
    const baseUrl = await startApp();
    const response = await fetch(`${baseUrl}/api/products?search=MOCHILA&categoryId=1`);
    const products = await response.json();

    expect(response.status).toBe(200);
    expect(products.map((product) => product.name)).toEqual(['Mochila urbana']);
  });
});
