function serializeProduct(row) {
  if (!row) return null;
  const imageData = Buffer.from(row.image_blob).toString('base64');
  return {
    id: row.id,
    name: row.name,
    categoryId: row.category_id,
    categoryName: row.category_name,
    description: row.description,
    priceCents: row.price_cents,
    available: Boolean(row.available),
    imageMime: row.image_mime,
    imageDataUrl: `data:${row.image_mime};base64,${imageData}`,
  };
}

const SELECT_PRODUCT = `
  SELECT p.*, c.name AS category_name
  FROM products p
  JOIN categories c ON c.id = p.category_id
`;

export function createProductRepository(db) {
  return {
    listCategories() {
      return db.prepare('SELECT id, name FROM categories ORDER BY id').all();
    },

    categoryExists(id) {
      return Boolean(db.prepare('SELECT 1 AS found FROM categories WHERE id = ?').get(id));
    },

    listProducts({ search = '', categoryId = null } = {}) {
      const conditions = [];
      const parameters = [];
      if (search.trim()) {
        conditions.push('instr(lower(p.name), lower(?)) > 0');
        parameters.push(search.trim());
      }
      if (categoryId !== null) {
        conditions.push('p.category_id = ?');
        parameters.push(categoryId);
      }
      const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
      const rows = db.prepare(`${SELECT_PRODUCT} ${where} ORDER BY p.id`).all(...parameters);
      return rows.map(serializeProduct);
    },

    getProduct(id) {
      return serializeProduct(db.prepare(`${SELECT_PRODUCT} WHERE p.id = ?`).get(id));
    },

    createProduct(product) {
      const result = db.prepare(`
        INSERT INTO products (name, category_id, description, price_cents, image_blob, image_mime, available)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
        product.name,
        product.categoryId,
        product.description,
        product.priceCents,
        product.imageBlob,
        product.imageMime,
        Number(product.available),
      );
      return this.getProduct(Number(result.lastInsertRowid));
    },

    updateProduct(id, product) {
      const result = db.prepare(`
        UPDATE products
        SET name = ?, category_id = ?, description = ?, price_cents = ?, image_blob = ?, image_mime = ?, available = ?
        WHERE id = ?
      `).run(
        product.name,
        product.categoryId,
        product.description,
        product.priceCents,
        product.imageBlob,
        product.imageMime,
        Number(product.available),
        id,
      );
      return Number(result.changes) > 0 ? this.getProduct(id) : null;
    },

    deleteProduct(id) {
      return Number(db.prepare('DELETE FROM products WHERE id = ?').run(id).changes) > 0;
    },
  };
}
