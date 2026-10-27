# Contrato local de catálogo

La interfaz React se comunica con el servidor local usando JSON por la ruta `/api`.
El servidor es una frontera técnica para SQLite; no se exponen el archivo ni las
consultas SQL al navegador.

## Operaciones

| Método | Ruta | Uso | Resultado |
|---|---|---|---|
| GET | `/api/categories` | Cargar categorías | Lista de identificador y nombre |
| GET | `/api/products` | Listar/buscar/filtrar | Lista; acepta `search` y `categoryId` opcionales |
| GET | `/api/products/:id` | Ver detalle | Producto o error no encontrado |
| POST | `/api/products` | Registrar producto | Producto guardado o error de validación |
| PUT | `/api/products/:id` | Editar producto/disponibilidad | Producto actualizado o error |
| DELETE | `/api/products/:id` | Eliminar tras confirmación de UI | Confirmación de eliminación o no encontrado |

## Datos y validación

- Producto: `id`, `name`, `categoryId`, `description`, `priceCents`, `available`,
  `imageMime` e `imageDataUrl`.
- `name`, `categoryId`, `description`, imagen y disponibilidad son requeridos.
- `priceCents` es entero positivo; el cliente presenta los importes en S/.
- La imagen debe tener MIME real PNG o JPEG y ocupar como máximo 5 MiB. El servidor
  valida el contenido recibido y no confía solo en el nombre/extensión del archivo.
- Errores devuelven estado HTTP apropiado y JSON `{ "error": "mensaje en español" }`.
- Las operaciones SQL usan parámetros enlazados. El usuario no envía SQL ni rutas de
  archivos.

## Alcance y seguridad

- La API solo administra productos y lee categorías iniciales; no incluye login,
  usuarios, roles, pedidos persistidos, pagos ni envío de mensajes.
- El servidor se enlaza a loopback para el prototipo local; no se configura como
  servicio público de producción.
- No se guardan datos personales ni secretos en la base del catálogo.
