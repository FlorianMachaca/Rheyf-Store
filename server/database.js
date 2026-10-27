import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { seedCategories, seedProducts } from './seedProducts.js';
import { readFileSync } from 'node:fs';

const IMAGE_DIRECTORY = resolve(process.cwd(), 'public/images');

export function createDatabase(databasePath = process.env.DATABASE_PATH || 'server/data/rheyf-store.db') {
  const resolvedPath = databasePath === ':memory:' ? databasePath : resolve(process.cwd(), databasePath);
  if (resolvedPath !== ':memory:') mkdirSync(dirname(resolvedPath), { recursive: true });

  const db = new DatabaseSync(resolvedPath);
  db.exec('PRAGMA foreign_keys = ON;');
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL UNIQUE
    ) STRICT;

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL CHECK (length(trim(name)) > 0),
      category_id INTEGER NOT NULL REFERENCES categories(id),
      description TEXT NOT NULL CHECK (length(trim(description)) > 0),
      price_cents INTEGER NOT NULL CHECK (price_cents > 0),
      image_blob BLOB NOT NULL,
      image_mime TEXT NOT NULL CHECK (image_mime IN ('image/png', 'image/jpeg')),
      available INTEGER NOT NULL CHECK (available IN (0, 1))
    ) STRICT;
  `);

  seedDatabase(db);
  return db;
}

function seedDatabase(db) {
  const insertCategory = db.prepare('INSERT OR IGNORE INTO categories (id, name) VALUES (?, ?)');
  for (const category of seedCategories) insertCategory.run(category.id, category.name);

  const count = db.prepare('SELECT COUNT(*) AS count FROM products').get().count;
  if (count > 0) return;

  const insertProduct = db.prepare(`
    INSERT INTO products (name, category_id, description, price_cents, image_blob, image_mime, available)
    VALUES (?, ?, ?, ?, ?, ?, 1)
  `);

  for (const product of seedProducts) {
    const imageBlob = readFileSync(resolve(IMAGE_DIRECTORY, product.imageFile));
    insertProduct.run(
      product.name,
      product.categoryId,
      product.description,
      product.priceCents,
      imageBlob,
      'image/png',
    );
  }
}
