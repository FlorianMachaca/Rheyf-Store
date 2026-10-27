import { Router } from 'express';
import { ValidationError, validateProductInput } from '../validation/product.js';

function positiveId(value) {
  const id = Number(value);
  if (!Number.isSafeInteger(id) || id <= 0) throw new ValidationError('El producto solicitado no es válido.');
  return id;
}

export function createProductRouter(repository) {
  const router = Router();

  router.get('/categories', (_request, response) => {
    response.json(repository.listCategories());
  });

  router.get('/products', (request, response) => {
    let categoryId = null;
    if (request.query.categoryId) {
      categoryId = Number(request.query.categoryId);
      if (!Number.isSafeInteger(categoryId) || categoryId <= 0) {
        throw new ValidationError('Selecciona una categoría válida.');
      }
    }
    const search = typeof request.query.search === 'string' ? request.query.search : '';
    response.json(repository.listProducts({ search, categoryId }));
  });

  router.get('/products/:id', (request, response) => {
    const product = repository.getProduct(positiveId(request.params.id));
    if (!product) throw new ValidationError('No encontramos ese producto.', 404);
    response.json(product);
  });

  router.post('/products', (request, response) => {
    const product = validateProductInput(request.body, repository);
    response.status(201).json(repository.createProduct(product));
  });

  router.put('/products/:id', (request, response) => {
    const id = positiveId(request.params.id);
    const product = validateProductInput(request.body, repository);
    const updated = repository.updateProduct(id, product);
    if (!updated) throw new ValidationError('No encontramos ese producto.', 404);
    response.json(updated);
  });

  router.delete('/products/:id', (request, response) => {
    const deleted = repository.deleteProduct(positiveId(request.params.id));
    if (!deleted) throw new ValidationError('No encontramos ese producto.', 404);
    response.json({ deleted: true });
  });

  return router;
}
