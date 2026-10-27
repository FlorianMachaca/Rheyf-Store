# Contratos de interfaz y WhatsApp

Este artefacto especifica el comportamiento observable. La interfaz usa el contrato
local de [api.md](./api.md) para los datos de catálogo y productos.

## Pantallas y acciones

| Vista | Datos visibles | Acción | Resultado observable |
|---|---|---|---|
| Inicio | Identidad, accesos y contenido destacado | Ver productos/categorías | Abre el catálogo o filtra la categoría elegida |
| Catálogo | Imagen, nombre, precio S/ y disponibilidad | Buscar, filtrar, ver detalle o agregar disponible | Resultados filtrados, detalle o línea en carrito |
| Detalle | Imagen, nombre, descripción, precio y disponibilidad | Agregar si disponible | Línea en carrito; artículo no disponible no se agrega |
| Carrito | Líneas, cantidades, subtotales y total | Cambiar cantidad, eliminar, continuar o confirmar | Importes recalculados; confirmación solo con productos disponibles |
| Confirmación | Resumen y total | Abrir WhatsApp o volver a comprar | Abre WhatsApp con texto editable o vuelve a la tienda |
| Administración de productos | Listado y formulario | Registrar, editar, cambiar disponibilidad, eliminar o cancelar | Catálogo público refleja los cambios válidos |

## Contrato de enlace WhatsApp

- Destino: conversación de WhatsApp con el número oficial de la tienda, configurado
  antes de implementación en formato internacional de solo dígitos.
- Mensaje precargado: saludo breve, líneas con nombre de producto, cantidad y precio,
  total en soles y una solicitud para coordinar disponibilidad y entrega.
- Codificación: URL válida y texto UTF-8 codificado para preservar tildes, espacios y
  saltos de línea.
- Control de envío: WhatsApp muestra el texto en el campo de redacción. La persona
  revisa, puede editar y decide enviarlo; abrir el enlace no confirma el envío.
- Fallo al abrir: mantener el pedido visible y presentar una indicación sencilla para
  intentar abrir WhatsApp desde un dispositivo compatible. No mostrar éxito de envío.
- Apariencia: verde solo para la acción de WhatsApp; las demás acciones conservan azul
  eléctrico según la especificación.

## Errores observables

- Formulario inválido: señalar el campo y evitar guardar.
- Eliminación: pedir confirmación; cancelar mantiene el producto.
- Carrito vacío o producto inválido/no disponible: impedir confirmar, explicar el
  motivo y permitir volver al carrito.
- Búsqueda/filtro sin coincidencias: mostrar estado vacío y permitir restablecer el
  catálogo.

## Límites

- La API local sirve únicamente a la interfaz del prototipo; no se publica una API para
  terceros.
- No se envían mensajes automáticamente ni se procesan pagos.
- La ruta o control de acceso visual a la administración no añade autenticación; la
  navegación concreta se definirá en el plan de interfaz respetando el prototipo.
