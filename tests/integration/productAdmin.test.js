import { afterEach, describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { createApp } from '../../server/app.js';
import { createDatabase } from '../../server/database.js';

let server; let database;
async function startApp() {
  database = createDatabase(':memory:'); server = createApp(database).listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));
  return `http://127.0.0.1:${server.address().port}`;
}
afterEach(async () => { if (server) await new Promise((resolve) => server.close(resolve)); if (database) database.close(); server = undefined; database = undefined; });

describe('administración básica del catálogo', () => {
  it('crea, actualiza disponibilidad y elimina productos con validación', async () => {
    const base = await startApp();
    const imageDataUrl = `data:image/png;base64,${readFileSync('public/images/mochila-urbana.png').toString('base64')}`;
    const payload = { name: 'Lámpara portátil', categoryId: 1, description: 'Lámpara de prueba', priceCents: 3590, imageDataUrl, available: true };
    let response = await fetch(`${base}/api/products`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    expect(response.status).toBe(201); const created = await response.json(); expect(created.name).toBe(payload.name);

    response = await fetch(`${base}/api/products/${created.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, available: false }) });
    expect(response.status).toBe(200); expect((await response.json()).available).toBe(false);

    response = await fetch(`${base}/api/products`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, priceCents: 0 }) });
    expect(response.status).toBe(400); expect((await response.json()).error).toMatch(/precio/i);
    response = await fetch(`${base}/api/products/${created.id}`, { method: 'DELETE' });
    expect(response.status).toBe(200); expect(await (await fetch(`${base}/api/products/${created.id}`)).status).toBe(404);
  });
});
