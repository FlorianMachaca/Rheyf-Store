---
description: "Tareas de implementación de Rheyf Store"
---

# Tasks: Rheyf Store

**Input**: Design documents from `specs/001-tienda-whatsapp/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`,
`contracts/api.md`, `contracts/ui-contracts.md`, `quickstart.md`

**Tests**: Incluidos porque la solicitud requiere implementar y probar el producto.

**Organization**: Las tareas están agrupadas por historia de usuario; todas las
pruebas indicadas se ejecutan antes de implementar su regla correspondiente.

## Formato

`- [ ] T### [P] [US#] Acción concreta y ruta`

- `[P]` marca tareas independientes que pueden ejecutarse en paralelo.
- `[US#]` identifica la historia; no se usa en Setup, Foundational ni Polish.
- Cada tarea indica los archivos a crear o modificar.

## Phase 1: Setup (infraestructura compartida)

**Propósito**: Inicializar la aplicación React/Vite y las dependencias mínimas del
servidor local y de pruebas.

- [X] T001 Inicializar Vite con React JavaScript y definir scripts `dev`, `server`, `build`, `start` y `test` en `package.json`, `index.html` y `src/main.jsx`.
- [X] T002 [P] Crear reglas de exclusión para `node_modules/`, `dist/`, `coverage/`, `.env*` (excepto `.env.example`) y `server/data/*.db` en `.gitignore`.
- [X] T003 Añadir React, Vite, Express y Vitest a dependencias/scripts; usar `node:sqlite` integrado en Node y registrar versiones en `package.json` y `package-lock.json`.
- [X] T004 Configurar proxy de desarrollo `/api` al servidor local en `vite.config.js`.
- [X] T005 Crear `.env.example` con `PORT=3001`, `DATABASE_PATH=server/data/rheyf-store.db` y el número de WhatsApp modificable; ignorar el archivo `.env` real en `.gitignore`.

---

## Phase 2: Foundational (bloqueante)

**Propósito**: Preparar SQLite, categorías/productos iniciales, lectura del catálogo y
errores comunes antes de las historias de usuario.

- [X] T006 Crear la base SQLite y tablas de categoría/producto en `server/database.js`; campos obligatorios `id`, `name`, `category_id`, `description`, `price_cents` entero > 0, `image_blob`, `image_mime` (`image/png` o `image/jpeg`) y `available` booleano.
- [X] T007 [P] Precargar las categorías únicas Accesorios, Ropa, Cuidado personal y Tecnología, los seis productos y sus imágenes PNG de demostración en `server/seedProducts.js` y `public/images/`.
- [X] T008 Implementar consultas parametrizadas para listar, buscar por nombre, filtrar por categoría y obtener producto por `id` en `server/productRepository.js`.
- [X] T009 Crear aplicación Express y servidor local enlazado a loopback, con ruta de salud solo para validación local, manejo JSON y servicio de `dist/` en `server/app.js` y `server/index.js`.
- [X] T010 Implementar `GET /api/categories`, `GET /api/products` (parámetros opcionales `search` y `categoryId`) y `GET /api/products/:id` en `server/routes/products.js`.
- [X] T011 Validar errores de entrada y de persistencia y devolver JSON en español con código HTTP apropiado mediante `server/middleware/errorHandler.js`.
- [X] T012 Crear acceso JSON tipado por convenciones del proyecto a categorías/listado/detalle en `src/services/productApi.js`.
- [X] T013 Definir formato monetario S/, utilidades de presentación y tokens de paleta oscuro/azul/verde en `src/features/products/money.js` y `src/styles/theme.css`.
- [X] T014 Crear prueba de integración de arranque y lectura inicial con base SQLite temporal en `tests/integration/catalogApi.test.js`.

**Checkpoint**: servidor local, esquema SQLite y lectura del catálogo responden con
datos iniciales; todavía no hay flujo de compra completo.

---

## Phase 3: User Story 1 - Explorar y encontrar productos (Priority: P1) 🎯 MVP

**Goal**: Ver inicio/catálogo, buscar por nombre y filtrar por categoría.

**Independent Test**: Con los seis productos de demostración visibles, buscar un nombre
parcial y filtrar cada categoría muestra solo coincidencias; una búsqueda sin
resultados ofrece restablecer filtros.

### Pruebas de US1

- [X] T015 [P] [US1] Probar búsqueda insensible a mayúsculas, filtrado por categoría y estado sin resultados en `tests/unit/catalog.test.js`.

### Implementación de US1

- [X] T016 [P] [US1] Crear encabezado de marca, navegación y página de inicio con accesos y productos/categorías destacadas en `src/components/SiteHeader.jsx` y `src/pages/HomePage.jsx`.
- [X] T017 [US1] Implementar catálogo que carga `/api/products` y `/api/categories`, busca por nombre y filtra por categoría en `src/pages/CatalogPage.jsx` y `src/features/products/catalog.js`.
- [X] T018 [P] [US1] Crear tarjeta de producto con imagen, nombre, precio S/, disponibilidad y acceso al detalle en `src/components/ProductCard.jsx`.
- [X] T019 [US1] Conectar inicio y catálogo, estados vacíos, errores de carga y navegación entre vistas en `src/App.jsx`.
- [X] T020 [US1] Verificar presentación en español de Perú y tema visual negro/gris con texto claro y acento azul; reservar verde para WhatsApp en `src/styles/theme.css` y `src/pages/HomePage.jsx`.

**Checkpoint**: búsqueda, filtro, inicio y catálogo funcionan usando el API y los datos
de demostración.

---

## Phase 4: User Story 2 - Revisar producto y armar carrito (Priority: P1)

**Goal**: Ver detalle, agregar productos disponibles y modificar el carrito con totales
correctos.

**Independent Test**: Abrir un producto, agregarlo, cambiar cantidad, eliminarlo y
verificar subtotal/total; los no disponibles no se agregan y el carrito vacío no puede
confirmarse.

### Pruebas de US2

- [X] T021 [P] [US2] Probar cantidad mínima, líneas removidas, indisponibilidad, subtotal y total en céntimos en `tests/unit/cart.test.js`.

### Implementación de US2

- [X] T022 [P] [US2] Implementar reglas de carrito en memoria (agregar, combinar cantidades, reducir hasta una unidad, quitar y derivar total) en `src/features/cart/cart.js`.
- [X] T023 [US2] Añadir vista de detalle con imagen, descripción, precio, disponibilidad y acción de agregar solo si está disponible en `src/pages/ProductDetailPage.jsx`.
- [X] T024 [US2] Añadir controles del carrito para cantidades, eliminar, estado vacío y total calculado desde líneas en `src/pages/CartPage.jsx` y `src/components/CartLine.jsx`.
- [X] T025 [US2] Conectar acciones de tarjetas/detalle y la vista de carrito manteniendo el estado mientras se navega en `src/App.jsx`.
- [X] T026 [US2] Marcar productos eliminados o no disponibles en el carrito y bloquear confirmación hasta quitarlos o restablecer disponibilidad en `src/features/cart/cart.js` y `src/pages/CartPage.jsx`.

**Checkpoint**: catálogo/detalle/carrito permiten completar el recorrido de selección y
calcular el total sin pagos.

---

## Phase 5: User Story 3 - Confirmar y preparar WhatsApp (Priority: P1)

**Goal**: Mostrar resumen y abrir un mensaje editable en WhatsApp, sin enviar ni
confirmar una compra automáticamente.

**Independent Test**: Con un carrito válido, abrir WhatsApp con el número configurado y
un texto que contiene todos los productos, cantidades, precios y total; desde carrito
vacío o inválido no se puede confirmar.

### Pruebas de US3

- [X] T027 [P] [US3] Probar normalización 930138447→51930138447 y mensaje con tienda, saludo, cantidad, precio unitario, subtotales, total, entrega y ambos accesos de WhatsApp en `tests/unit/whatsappLink.test.js` y `tests/unit/orderFlow.test.jsx`.

### Implementación de US3

- [X] T028 [P] [US3] Configurar el número peruano modificable y preparar enlace click-to-chat internacional con mensaje en español UTF-8 en `src/config/store.js` y `src/services/whatsappLink.js`.
- [X] T029 [US3] Crear pantalla de confirmación con resumen, botón WhatsApp verde y regreso a compra; no indicar envío o pago completado en `src/pages/OrderConfirmationPage.jsx`.
- [X] T030 [US3] Abrir WhatsApp desde “Confirmar pedido” y “Pedir por WhatsApp”, bloquear carrito vacío o inválido y conservar el resumen sin afirmar envío en `src/App.jsx`, `src/pages/CartPage.jsx` y `src/pages/OrderConfirmationPage.jsx`.

**Checkpoint**: la persona controla la apertura, edición y envío desde WhatsApp; la
tienda nunca envía el mensaje por su cuenta.

---

## Phase 6: User Story 4 - Administrar productos de demostración (Priority: P2)

**Goal**: Crear, editar, cambiar disponibilidad y eliminar productos, sin login.

**Independent Test**: Crear producto válido, verlo en tienda y administración tras
recargar, editarlo, marcarlo no disponible, eliminarlo; rechazar entradas inválidas.

### Pruebas de US4

- [X] T031 [P] [US4] Probar validación, alta, edición, disponibilidad, eliminación y errores del repositorio contra SQLite temporal en `tests/integration/productAdmin.test.js`.
- [X] T032 [P] [US4] Probar formularios de alta/edición: requeridos, precio > 0, PNG/JPEG y límite inclusivo de 5 MiB en `tests/unit/productValidation.test.js`.

### Implementación de US4

- [X] T033 [US4] Implementar validación de producto y de data URL PNG/JPEG (bytes reales ≤ 5 MiB) en `server/validation/product.js` y `src/features/products/validation.js`.
- [X] T034 [US4] Añadir operaciones parametrizadas de crear, actualizar y eliminar producto y su disponibilidad en `server/productRepository.js`.
- [X] T035 [US4] Añadir `POST`, `PUT` y `DELETE /api/products` con control de MIME/tamaño, validación y errores legibles en `server/routes/products.js`.
- [X] T036 [US4] Crear administración pública simplificada con tabla/listado y formulario de producto; la categoría se elige de las existentes en `src/pages/AdminProductsPage.jsx` y `src/components/ProductForm.jsx`.
- [X] T037 [US4] Implementar carga/edición de imagen y mostrar errores por campo sin guardar datos inválidos en `src/components/ProductForm.jsx`.
- [X] T038 [US4] Implementar confirmación/cancelación de eliminación y cancelación de formulario sin guardar en `src/pages/AdminProductsPage.jsx`.
- [X] T039 [US4] Verificar que cambios del producto se reflejan en catálogo y detalle, incluida indisponibilidad y eliminación con carrito existente en `src/pages/CatalogPage.jsx`, `src/pages/ProductDetailPage.jsx` y `src/features/cart/cart.js`.

**Checkpoint**: CRUD demostrativo refleja cambios en el catálogo; la administración no
solicita autenticación.

---

## Phase 7: Polish y validación transversal

**Propósito**: Ejecutar verificaciones finales del alcance y documentar comandos reales.

- [X] T040 [P] Añadir `README.md` con versiones requeridas, variables de configuración y comandos efectivos de desarrollo, prueba y build en `README.md`.
- [X] T041 Revisar formato español/S/, contraste y uso exclusivo del verde WhatsApp en `src/styles/theme.css` y todas las pantallas `src/pages/`.
- [X] T042 Ejecutar `npm test` y corregir fallos; dejar el resultado reproducible en `tests/`.
- [X] T043 Ejecutar `npm run build`, comprobar respuesta local de API y Vite, probar la lógica del enlace WhatsApp y documentar que abrirlo requiere configurar el teléfono en `.env`.
- [X] T044 Revisar que no haya pagos, autenticación, categorías administrables, pedidos persistentes, usuarios u opciones fuera de alcance en `src/`, `server/` y `README.md`.
- [X] T045 [US4] Incluir búsqueda por nombre y filtro por categoría en la lista administrativa, reutilizando `filterProducts` y mostrando estado sin resultados en `src/pages/AdminProductsPage.jsx`.

---

## Dependencias y orden de ejecución

### Dependencias de fases

- **Setup (Phase 1)**: inicialización y dependencias.
- **Foundational (Phase 2)**: depende de Setup y bloquea las cuatro historias.
- **US1 (Phase 3)**: requiere lectura de categorías/productos y utilidades comunes.
- **US2 (Phase 4)**: requiere listado/detalle de US1 y reglas del carrito.
- **US3 (Phase 5)**: requiere carrito válido de US2.
- **US4 (Phase 6)**: requiere catálogo/API fundacional; completa operaciones de escritura.
- **Polish (Phase 7)**: requiere historias aprobadas completas.

### Dependencias de historias

- **US1 (P1)**: independiente después de Foundational; es el MVP visual del catálogo.
- **US2 (P1)**: después de US1 para reutilizar tarjetas, detalle y catálogo.
- **US3 (P1)**: después de US2 porque necesita el carrito y su total.
- **US4 (P2)**: después de Foundational; secuenciada después de US3 para evitar modificar
  el mismo repositorio/rutas durante los flujos previos.

### Oportunidades paralelas

- T002 puede ejecutarse en paralelo con T001; T003 requiere el scaffold.
- Dentro de US1, pruebas T015 y tarjeta T018 trabajan en archivos distintos; la
  navegación T019 integra esas piezas después.
- Dentro de US2, pruebas T021 y reglas T022 pueden prepararse en archivos separados;
  la vista T024 se integra después con T025.
- Dentro de US4, pruebas T031 y T032 cubren archivos distintos y pueden prepararse en
  paralelo antes de las tareas de escritura correspondientes.

## Ejemplo paralelo: User Story 1

```text
T015: tests/unit/catalog.test.js — búsqueda y filtros
T018: src/components/ProductCard.jsx — tarjeta reusable
```

## Estrategia de implementación

### MVP primero

1. Completar Setup y Foundational.
2. Implementar US1 y validar catálogo/estilo con datos iniciales.
3. Continuar con US2 y US3 para completar el pedido por WhatsApp.
4. Agregar US4 y volver a validar el catálogo tras cambios administrativos.

### Entrega incremental

Completar pruebas y criterios de aceptación de cada historia antes de avanzar. No se
incluye fase de despliegue, pagos ni nuevas funciones.

## Notas

- Cada tarea está marcada con checkbox, ID secuencial y ruta de archivo.
- `[P]` solo identifica tareas con archivos distintos y sin dependencias incompletas.
- Las pruebas se ejecutan antes de la implementación de la regla asociada.
- Los comandos pasan a ser ejecutables después de crear scripts en `package.json`.
