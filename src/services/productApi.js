async function request(path, options) {
  let response;
  try {
    response = await fetch(`/api${path}`, options);
  } catch {
    throw new Error('No pudimos conectar con la tienda. Verifica que el servidor esté iniciado.');
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || 'No pudimos completar la operación.');
  return payload;
}

export function getCategories() {
  return request('/categories');
}

export function getProducts({ search = '', categoryId = '' } = {}) {
  const parameters = new URLSearchParams();
  if (search) parameters.set('search', search);
  if (categoryId) parameters.set('categoryId', categoryId);
  const suffix = parameters.size ? `?${parameters.toString()}` : '';
  return request(`/products${suffix}`);
}

export function getProduct(id) {
  return request(`/products/${encodeURIComponent(id)}`);
}

function jsonOptions(method, product) {
  return {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  };
}

export function createProduct(product) {
  return request('/products', jsonOptions('POST', product));
}

export function updateProduct(id, product) {
  return request(`/products/${encodeURIComponent(id)}`, jsonOptions('PUT', product));
}

export function deleteProduct(id) {
  return request(`/products/${encodeURIComponent(id)}`, { method: 'DELETE' });
}
