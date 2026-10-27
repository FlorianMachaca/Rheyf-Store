# Feature Specification: Tienda y pedidos por WhatsApp

**Feature Branch**: `001-tienda-whatsapp`

**Created**: 2026-10-26

**Status**: Draft

**Input**: User description: "Crear la especificación funcional de Rheyf Store tomando como referencia principal la imagen del prototipo adjunta. Definir catálogo, búsqueda y categorías, detalle, carrito, confirmación, mensaje para WhatsApp y administración demostrativa de productos. No incluir pagos en línea, autenticación administrativa ni funcionalidades no solicitadas."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Explorar y encontrar productos (Priority: P1)

Como persona que visita Rheyf Store, quiero explorar el catálogo, buscar productos y
filtrar por categoría para encontrar artículos disponibles que me interesen.

**Why this priority**: Es el punto de entrada de compra y permite descubrir los
productos del prototipo.

**Independent Test**: Con productos de varias categorías cargados, se puede abrir la
tienda, recorrer productos, buscar por nombre y aplicar una categoría; cada acción
muestra los resultados correspondientes.

**Acceptance Scenarios**:

1. **Given** que existen productos disponibles, **When** la persona abre la página de
   inicio, **Then** ve la identidad Rheyf Store, un acceso al catálogo y productos o
   categorías destacadas.
2. **Given** que hay productos disponibles de distintas categorías, **When** la persona
   abre el catálogo, **Then** ve cada producto con imagen, nombre y precio en soles, y
   puede abrir su detalle.
3. **Given** que el catálogo contiene productos con nombres distintos, **When** la
   persona escribe parte de un nombre en la búsqueda, **Then** solo aparecen los
   productos cuyos nombres contienen ese texto, sin distinguir mayúsculas de
   minúsculas.
4. **Given** que existen productos en más de una categoría, **When** la persona elige
   una categoría, **Then** el catálogo muestra solo los productos de esa categoría;
   al elegir todas las categorías vuelve a mostrar el catálogo completo.
5. **Given** que la búsqueda y la categoría seleccionadas no coinciden con productos,
   **When** se actualizan los resultados, **Then** la página comunica que no hay
   resultados y permite limpiar la búsqueda o volver a todas las categorías.

---

### User Story 2 - Revisar un producto y armar el carrito (Priority: P1)

Como persona interesada en un producto, quiero revisar su información y agregarlo al
carrito en la cantidad deseada para conocer el importe de mi pedido.

**Why this priority**: El detalle y el carrito permiten evaluar una compra antes de
preparar el pedido.

**Independent Test**: Desde un producto disponible se abre el detalle, se comprueba su
información, se añade al carrito, se cambia su cantidad y se verifica el subtotal y
el total visibles.

**Acceptance Scenarios**:

1. **Given** un producto del catálogo, **When** la persona abre su detalle, **Then** ve
   su imagen, nombre, descripción, precio en S/ y estado de disponibilidad.
2. **Given** un producto disponible, **When** la persona agrega una unidad al carrito,
   **Then** el carrito refleja el producto y su cantidad.
3. **Given** una tarjeta de producto disponible en el catálogo, **When** la persona
   usa la acción para agregarlo al carrito, **Then** aparece en el carrito con una
   unidad.
4. **Given** un producto no disponible, **When** la persona abre su detalle, **Then**
   ve el estado no disponible y no puede agregarlo al carrito.
5. **Given** un producto ya incluido en el carrito, **When** la persona aumenta o
   reduce su cantidad, **Then** la cantidad y los importes correspondientes se
   actualizan; la cantidad mínima es una unidad.
6. **Given** un artículo en el carrito, **When** la persona lo elimina, **Then** deja
   de aparecer y el importe se recalcula.
7. **Given** un carrito con uno o más artículos, **When** la persona consulta el
   resumen, **Then** cada subtotal de línea equivale al precio por cantidad y el total
   equivale a la suma de esos subtotales, expresados en S/.
8. **Given** que se eliminó el último artículo, **When** se muestra el carrito,
   **Then** aparece un estado vacío y un acceso para continuar comprando.

---

### User Story 3 - Confirmar y enviar el pedido por WhatsApp (Priority: P1)

Como persona que terminó de elegir productos, quiero revisar la confirmación y abrir
WhatsApp con el detalle preparado para enviar el pedido a la tienda.

**Why this priority**: WhatsApp es el canal de coordinación de pedidos definido para
esta versión; el prototipo no procesa pagos ni registra una compra pagada.

**Independent Test**: Con un carrito válido, se inicia la confirmación, se verifica el
resumen y se activa el botón verde; WhatsApp se abre con destinatario y mensaje que
coinciden con el pedido.

**Acceptance Scenarios**:

1. **Given** un carrito con artículos disponibles, **When** la persona inicia la
   confirmación, **Then** ve una pantalla de pedido listo para enviar por WhatsApp y el
   total del carrito.
2. **Given** que el pedido está listo, **When** la persona selecciona la acción verde
   para enviar por WhatsApp, **Then** se abre WhatsApp dirigido al número configurado
   de la tienda con un mensaje que contiene cada producto, su cantidad, su precio y el
   total del pedido.
3. **Given** el mensaje preparado en WhatsApp, **When** la persona lo revisa,
   **Then** puede editarlo y debe enviarlo desde WhatsApp; Rheyf Store no lo envía por
   cuenta de la persona.
4. **Given** un carrito vacío o con un producto que ya no está disponible, **When** la
   persona intenta confirmar, **Then** no se prepara el pedido y se indica cómo
   corregir el carrito.
5. **Given** que la persona está en la pantalla de confirmación, **When** elige
   continuar comprando, **Then** vuelve a la tienda sin que se le muestre un pago
   completado.

---

### User Story 4 - Administrar productos de demostración (Priority: P2)

Como persona que mantiene el catálogo de demostración, quiero registrar, editar y
eliminar productos para mantener actualizada la oferta visible en la tienda.

**Why this priority**: El catálogo debe poder prepararse y mantenerse para las
demostraciones, pero el flujo público de compra es el valor principal de la primera
versión.

**Independent Test**: Desde la vista de administración sin autenticación, se registra
un producto válido, se edita, se cambia su disponibilidad y se elimina; las listas
administrativa y pública reflejan cada cambio.

**Acceptance Scenarios**:

1. **Given** la vista simplificada de productos, **When** la persona la abre,
   **Then** puede ver, buscar y filtrar los productos administrables y encuentra una
   acción para crear uno nuevo.
2. **Given** la vista de administración sin autenticación, **When** la persona la abre,
   **Then** puede acceder al listado sin iniciar sesión.
3. **Given** el formulario de producto nuevo, **When** se ingresan nombre, categoría,
   precio mayor que cero, descripción, imagen válida y disponibilidad, **Then** el
   producto se guarda y aparece en la lista y el catálogo.
4. **Given** el formulario de producto, **When** falta un campo obligatorio, el precio
   no es numérico o es menor o igual a cero, o la imagen no es PNG/JPG o excede 5 MB,
   **Then** se impide guardar y se identifica el campo que debe corregirse.
5. **Given** un producto existente, **When** la persona edita sus datos y guarda,
   **Then** la lista administrativa y la tienda muestran los valores actualizados.
6. **Given** un producto existente, **When** la persona cambia su disponibilidad a no
   disponible, **Then** la tienda muestra ese estado y no permite agregarlo al carrito.
7. **Given** un producto existente, **When** la persona confirma su eliminación,
   **Then** deja de aparecer en las listas; si cancela la acción, el producto se
   conserva.
8. **Given** un formulario con cambios sin guardar, **When** la persona cancela,
   **Then** vuelve a la lista sin guardar esos cambios.

### Edge Cases

- Una búsqueda vacía muestra los resultados de la categoría seleccionada; si también
  se selecciona “Todas las categorías”, muestra todos los productos disponibles.
- Una búsqueda sin coincidencias informa el resultado vacío y permite volver a un
  catálogo visible.
- El precio debe ser un importe numérico positivo. Los precios, subtotales y totales
  se presentan en soles con dos decimales cuando corresponda.
- No se puede reducir la cantidad de una línea por debajo de una unidad; para quitarla
  se usa la acción de eliminar.
- Si un producto se marca no disponible o se elimina mientras está en el carrito,
  debe identificarse en el carrito y bloquear la confirmación hasta que la persona lo
  quite o el producto vuelva a estar disponible.
- Un carrito vacío no permite iniciar la confirmación ni abrir el envío de pedido.
- Si WhatsApp no está instalado o el dispositivo no puede abrir el enlace, la persona
  recibe una indicación para volver al carrito o intentarlo desde un dispositivo con
  WhatsApp; el sistema no afirma que el pedido fue enviado.
- Cancelar un formulario no guarda cambios; cancelar una eliminación conserva el
  producto.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La tienda MUST mostrar una página de inicio con identidad de Rheyf Store,
  acceso al catálogo, productos o categorías destacadas y navegación a las secciones
  solicitadas.
- **FR-002**: El catálogo MUST mostrar los productos administrables con imagen, nombre,
  precio en soles y estado de disponibilidad.
- **FR-003**: La persona MUST poder buscar productos por parte de su nombre sin
  distinguir mayúsculas de minúsculas.
- **FR-004**: La persona MUST poder filtrar el catálogo por categoría y restaurar la
  vista de todas las categorías.
- **FR-005**: La tienda MUST mostrar un estado vacío claro cuando no haya productos o
  resultados que presentar.
- **FR-006**: El detalle MUST mostrar imagen, nombre, descripción, precio en S/ y
  disponibilidad del producto.
- **FR-007**: La persona MUST poder agregar productos disponibles al carrito desde el
  catálogo o su detalle.
- **FR-008**: El carrito MUST permitir cambiar cantidades, eliminar productos y
  continuar comprando.
- **FR-009**: El carrito MUST calcular cada subtotal como precio unitario por cantidad,
  y el total como suma de subtotales; MUST presentar los importes en soles.
- **FR-010**: La tienda MUST impedir que un producto no disponible se agregue al
  carrito y MUST impedir confirmar si un artículo del carrito dejó de estar disponible.
- **FR-011**: La confirmación MUST presentar el resumen y el total del pedido y MUST
  permitir volver a la tienda.
- **FR-012**: La confirmación y el carrito MUST ofrecer enlaces click-to-chat a WhatsApp
  dirigidos al número del negocio. El mensaje editable MUST incluir el nombre Rheyf
  Store, saludo, productos, cantidades, precios unitarios, subtotales por producto,
  subtotal general, total en soles y una solicitud para coordinar la entrega.
- **FR-013**: La tienda MUST dejar claro que el mensaje se envía desde WhatsApp por
  decisión de la persona y MUST no indicar que un pedido fue enviado o pagado antes de
  que la persona realice esas acciones fuera de la tienda.
- **FR-014**: La vista demostrativa MUST permitir registrar, editar y eliminar
  productos y reflejar los cambios en el catálogo.
- **FR-015**: Los datos obligatorios del producto MUST ser nombre, categoría, precio,
  descripción, imagen y disponibilidad. El precio MUST ser numérico y mayor que cero.
- **FR-016**: La administración MUST aceptar imágenes PNG o JPG de hasta 5 MB y
  comunicar errores de validación de manera comprensible.
- **FR-017**: La eliminación de un producto MUST requerir confirmación y permitir
  cancelar sin cambios.
- **FR-018**: La interfaz MUST estar en español de Perú y mantener el diseño de la
  referencia: fondos negros y grises oscuros, textos claros, azul eléctrico para
  botones y detalles, y verde únicamente para acciones de WhatsApp.
- **FR-019**: La primera versión MUST excluir pagos en línea, autenticación
  administrativa y funciones que no estén definidas en esta especificación.
- **FR-020**: La tienda MUST validar los datos ingresados y no exponer información
  personal innecesaria ni secretos.

### Key Entities *(include if feature involves data)*

- **Producto**: artículo del catálogo con nombre, categoría, descripción, precio en
  soles, imagen y estado de disponibilidad.
- **Categoría**: agrupación que permite clasificar y filtrar productos.
- **Carrito**: selección temporal de productos disponibles y sus cantidades; cada línea
  permite calcular un subtotal.
- **Pedido preparado**: resumen derivado del carrito, con líneas y total, usado para
  preparar el mensaje editable de WhatsApp. No representa pago ni envío confirmado.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El 100% de los escenarios de aceptación de búsqueda, filtro, detalle,
  carrito, confirmación, WhatsApp y administración puede verificarse mediante la
  interfaz de la aplicación.
- **SC-002**: En todas las pruebas del carrito con datos conocidos, el subtotal de cada
  línea y el total mostrado coinciden exactamente con la suma de precio por cantidad,
  en soles.
- **SC-003**: Para cada escenario de pedido válido, el mensaje abierto en WhatsApp
  contiene el nombre de la tienda, saludo, el 100% de los productos y cantidades,
  precio unitario, subtotales por línea, subtotal general, total y solicitud de entrega.
- **SC-004**: Los cambios válidos de alta, edición y eliminación de producto se
  reflejan en la vista administrativa y en el catálogo; los datos inválidos no se
  guardan.
- **SC-005**: En una revisión visual frente a la referencia, todas las pantallas
  especificadas conservan la paleta oscura, el acento azul eléctrico y el verde
  reservado a acciones de WhatsApp.

## Assumptions

- La tienda opera en un solo mercado: Perú; todas las cantidades de dinero usan soles.
- El número comercial configurado es 930138447. La aplicación lo normaliza al formato
  internacional peruano 51930138447; se puede modificar en `src/config/store.js` o
  mediante `VITE_WHATSAPP_PHONE_NUMBER`.
- Las categorías existentes se ofrecen para selección y filtro; administrar categorías
  no forma parte del alcance.
- Para que el prototipo no inicie vacío, el catálogo demostrativo comienza con los
  seis productos y las cuatro categorías visibles en la referencia: Mochila urbana
  (Accesorios, S/ 79.90), Camiseta básica (Ropa, S/ 29.90), Audífonos inalámbricos
  (Tecnología, S/ 89.90), Reloj casual (Tecnología, S/ 69.90), Perfume urbano
  (Cuidado personal, S/ 49.90) y Gorra deportiva (Accesorios, S/ 39.90). Todos
  comienzan disponibles y pueden mantenerse desde la administración de productos.
- Disponibilidad es un estado disponible/no disponible. No se define control de stock,
  reserva de inventario ni decremento de unidades.
- El total es la suma de los productos del carrito; no se calcula envío, impuesto,
  descuento ni cargo adicional en esta versión.
- La administración demostrativa está accesible sin autenticación, tal como se
  solicita para el prototipo. No administra usuarios, roles ni configuración.
- El producto es un prototipo: el enlace abre WhatsApp para que la persona revise y
  envíe el mensaje; no procesa pagos ni confirma una transacción.
- Los cambios de productos deben conservarse durante el uso normal del prototipo y
  seguir visibles al volver a cargar la tienda.
