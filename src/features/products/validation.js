export function validateProductForm(product) {
  const errors = {};
  if (!product.name?.trim()) errors.name = 'Ingresa el nombre del producto.';
  if (!product.description?.trim()) errors.description = 'Ingresa una descripción.';
  if (!Number.isSafeInteger(Number(product.categoryId)) || Number(product.categoryId) <= 0) errors.categoryId = 'Selecciona una categoría.';
  const price = String(product.price ?? '').trim().replace(',', '.');
  if (!/^\d+(\.\d{1,2})?$/.test(price) || Number(price) <= 0) errors.price = 'Ingresa un precio mayor que S/ 0.00.';
  if (!product.imageDataUrl) errors.image = 'Selecciona una imagen PNG o JPG.';
  else if (!/^data:image\/(png|jpeg);base64,/.test(product.imageDataUrl)) errors.image = 'La imagen debe ser PNG o JPG.';
  else if (Math.floor(product.imageDataUrl.split(',')[1].length * 3 / 4) > 5 * 1024 * 1024) errors.image = 'La imagen no debe superar los 5 MB.';
  return errors;
}
