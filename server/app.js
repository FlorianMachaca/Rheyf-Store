import express from 'express';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { errorHandler } from './middleware/errorHandler.js';
import { createProductRepository } from './productRepository.js';
import { createProductRouter } from './routes/products.js';

export function createApp(database) {
  const app = express();
  const repository = createProductRepository(database);
  const distDirectory = resolve(process.cwd(), 'dist');

  app.disable('x-powered-by');
  app.use(express.json({ limit: '8mb' }));
  app.get('/api/health', (_request, response) => response.json({ status: 'ok' }));
  app.use('/api', createProductRouter(repository));
  app.use('/api', (_request, response) => response.status(404).json({ error: 'No encontramos esta operación.' }));

  if (existsSync(distDirectory)) {
    app.use(express.static(distDirectory));
    app.use((_request, response, next) => {
      response.sendFile(resolve(distDirectory, 'index.html'), (error) => {
        if (error) next(error);
      });
    });
  }

  app.use(errorHandler);
  return app;
}
