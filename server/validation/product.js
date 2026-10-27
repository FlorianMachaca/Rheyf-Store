export class ValidationError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = 'ValidationError';
    this.status = status;
  }
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

function requiredText(value, label) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new ValidationError(`Ingresa ${label}.`);
  }
  return value.trim();
}

function decodeImageDataUrl(value) {
  if (typeof value !== 'string') throw new ValidationError('Selecciona una imagen PNG o JPG.');
  const match = /^data:(image\/png|image\/jpeg);base64,([A-Za-z0-9+/]+={0,2})$/.exec(value);
  if (!match) throw new ValidationError('La imagen debe ser un archivo PNG o JPG válido.');

  const [, mime, encoded] = match;
  const imageBlob = Buffer.from(encoded, 'base64');
  if (!imageBlob.length || imageBlob.length > MAX_IMAGE_BYTES) {
    throw new ValidationError('La imagen no debe superar los 5 MB.');
  }

  const validPng = mime === 'image/png'
    && imageBlob.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  const validJpeg = mime === 'image/jpeg'
    && imageBlob[0] === 0xff && imageBlob[1] === 0xd8 && imageBlob[2] === 0xff;
  if (!validPng && !validJpeg) throw new ValidationError('El contenido de la imagen no coincide con su formato.');

  return { imageBlob, imageMime: mime };
}

export function validateProductInput(input, repository) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new ValidationError('Revisa los datos del producto.');
  }

  const categoryId = Number(input.categoryId);
  if (!Number.isSafeInteger(categoryId) || categoryId <= 0 || !repository.categoryExists(categoryId)) {
    throw new ValidationError('Selecciona una categoría válida.');
  }

  const priceCents = Number(input.priceCents);
  if (!Number.isSafeInteger(priceCents) || priceCents <= 0) {
    throw new ValidationError('El precio debe ser mayor que S/ 0.00.');
  }
  if (typeof input.available !== 'boolean') {
    throw new ValidationError('Indica si el producto está disponible.');
  }

  const { imageBlob, imageMime } = decodeImageDataUrl(input.imageDataUrl);
  return {
    name: requiredText(input.name, 'el nombre del producto'),
    categoryId,
    description: requiredText(input.description, 'la descripción'),
    priceCents,
    imageBlob,
    imageMime,
    available: input.available,
  };
}
