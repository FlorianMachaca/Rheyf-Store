import { createApp } from './app.js';
import { createDatabase } from './database.js';

const database = createDatabase();
const app = createApp(database);
const port = Number(process.env.PORT || 3001);
const server = app.listen(port, '127.0.0.1', () => {
  console.log(`Rheyf Store API disponible en http://127.0.0.1:${port}`);
});

function closeServer() {
  server.close(() => {
    database.close();
    process.exit(0);
  });
}

process.on('SIGINT', closeServer);
process.on('SIGTERM', closeServer);
