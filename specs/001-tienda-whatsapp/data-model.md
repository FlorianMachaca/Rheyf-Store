# Modelo de datos: Tienda y pedidos por WhatsApp

El modelo separa el catálogo persistente del carrito temporal. Los importes se guardan
como enteros en céntimos para evitar errores de redondeo; la interfaz los presenta
como soles peruanos. El servidor local accede a SQLite; el navegador no abre el archivo
de base de datos.

## Categoría

| Campo | Tipo lógico | Regla |
|---|---|---|
| id | Identificador | Único, requerido |
| name | Texto | Requerido; único para evitar categorías duplicadas |

Relación: una categoría puede contener cero o muchos productos. La administración de
categorías no está incluida. Se precargan Accesorios, Ropa, Cuidado personal y
Tecnología, según la referencia visual.

## Producto

| Campo | Tipo lógico | Regla |
|---|---|---|
| id | Identificador | Único, requerido |
| name | Texto | Requerido |
| category_id | Identificador de Categoría | Requerido; debe referir una categoría existente |
| description | Texto | Requerido |
| price_cents | Entero | Requerido; mayor que cero |
| image_blob | BLOB | Requerida; contenido PNG o JPG; tamaño original máximo 5 MB |
| image_mime | Texto | Requerido; `image/png` o `image/jpeg` |
| available | Booleano | Requerido; disponible o no disponible |

La especificación no exige que el nombre de producto sea único; pueden existir
productos con el mismo nombre. La implementación debe usar `id` para editar, eliminar,
relacionar productos y preservar su identidad.

El catálogo inicial contiene los seis productos mostrados en la referencia, con sus
categorías y precios visibles; todos comienzan disponibles. El resto del texto
descriptivo e imágenes de demostración se prepara como contenido editable del producto.

## Carrito y pedido preparado

- **Línea de carrito**: `product_id` más `quantity` entero positivo. Se mantiene
  temporalmente durante la navegación; el total no se duplica como dato persistido.
- **Subtotal**: precio vigente del producto multiplicado por la cantidad.
- **Pedido preparado**: resumen temporal de las líneas disponibles y el total, formado
  justo antes de abrir WhatsApp. No se guarda como historial ni representa una compra
  pagada o enviada.

Si el producto ya no existe o no está disponible, su línea se marca como inválida y se
bloquea la confirmación hasta que se quite o vuelva a estar disponible.

## Persistencia

- Un servidor Node local usa el módulo integrado `node:sqlite` y consultas
  parametrizadas. La ruta predeterminada del archivo es `server/data/rheyf-store.db`.
- Las imágenes se guardan como BLOB y MIME en la misma fila de Producto para evitar
  un servicio de archivos separado. El servidor verifica MIME y tamaño antes de guardar.
- El carrito y el pedido preparado permanecen temporales en la interfaz; no se crea una
  tabla de pedidos ni historial.
