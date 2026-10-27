import { ValidationError } from '../validation/product.js';

export function errorHandler(error, _request, response, _next) {
  if (response.headersSent) return;

  if (error?.type === 'entity.too.large') {
    response.status(413).json({ error: 'El archivo es demasiado grande. El máximo es 5 MB.' });
    return;
  }

  if (error instanceof ValidationError) {
    response.status(error.status).json({ error: error.message });
    return;
  }

  response.status(500).json({ error: 'No pudimos completar la operación. Inténtalo nuevamente.' });
}
