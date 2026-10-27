export function filterProducts(products, { search = '', categoryId = '' } = {}) {
  const normalizedSearch = search.trim().toLocaleLowerCase('es-PE');
  const normalizedCategory = categoryId ? Number(categoryId) : null;

  return products.filter((product) => {
    const nameMatches = !normalizedSearch
      || product.name.toLocaleLowerCase('es-PE').includes(normalizedSearch);
    const categoryMatches = normalizedCategory === null
      || Number(product.categoryId) === normalizedCategory;
    return nameMatches && categoryMatches;
  });
}
