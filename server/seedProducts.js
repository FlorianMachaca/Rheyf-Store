export const seedCategories = [
  { id: 1, name: 'Accesorios' },
  { id: 2, name: 'Ropa' },
  { id: 3, name: 'Cuidado personal' },
  { id: 4, name: 'Tecnología' },
];

export const seedProducts = [
  {
    name: 'Mochila urbana', categoryId: 1, priceCents: 7990,
    description: 'Mochila moderna y resistente, ideal para el uso diario. Con múltiples compartimentos y diseño urbano.',
    imageFile: 'mochila-urbana.png',
  },
  {
    name: 'Camiseta básica', categoryId: 2, priceCents: 2990,
    description: 'Una prenda cómoda y versátil para acompañarte todos los días.',
    imageFile: 'camiseta-basica.png',
  },
  {
    name: 'Audífonos inalámbricos', categoryId: 4, priceCents: 8990,
    description: 'Audífonos inalámbricos para disfrutar tu música en cualquier momento.',
    imageFile: 'audifonos-inalambricos.png',
  },
  {
    name: 'Reloj casual', categoryId: 4, priceCents: 6990,
    description: 'Reloj de diseño clásico para completar tu estilo diario.',
    imageFile: 'reloj-casual.png',
  },
  {
    name: 'Perfume urbano', categoryId: 3, priceCents: 4990,
    description: 'Fragancia moderna para acompañarte durante el día.',
    imageFile: 'perfume-urbano.png',
  },
  {
    name: 'Gorra deportiva', categoryId: 1, priceCents: 3990,
    description: 'Gorra ligera de estilo deportivo para el uso diario.',
    imageFile: 'gorra-deportiva.png',
  },
];
