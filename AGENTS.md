# Rheyf Store

## Objetivo
Prototipo de tienda virtual de productos variados para consultar el catálogo,
armar un pedido y coordinarlo por WhatsApp.

## Stack
Frontend React con Vite; API local con Express y base de datos SQLite mediante el
módulo integrado `node:sqlite` (Node.js 24.15 o superior). No incorporar tecnologías
adicionales sin una necesidad aprobada. La guía del laboratorio no está incluida en
el repositorio; la conexión local actual queda documentada en `specs/001-tienda-whatsapp/plan.md`.

## Diseño y alcance
Respetar el prototipo: fondo negro y gris oscuro, texto claro, azul eléctrico para
botones/detalles y verde únicamente para acciones de WhatsApp. La interfaz y los
mensajes están en español de Perú; los precios se muestran en soles (S/).

Incluye inicio, catálogo con búsqueda y categorías, detalle, carrito, confirmación,
enlace de WhatsApp y administración demostrativa para registrar, editar y eliminar
productos. No incluye pagos en línea ni autenticación administrativa.

## Ejecución y pruebas
Desde la raíz del repositorio, con Node.js 24.15+ y npm:

```powershell
npm install
npm run server
```

En una segunda terminal para abrir la interfaz de desarrollo:

```powershell
npm run dev
```

Configura `VITE_WHATSAPP_PHONE_NUMBER` en un archivo local `.env`, con prefijo de país
y solo dígitos (por ejemplo, `51999888777`). El servidor usa SQLite local en
`server/data/rheyf-store.db` por defecto; `.env.example` documenta `PORT`,
`DATABASE_PATH` y el teléfono.

```powershell
npm test
npm run build
```

## Convenciones
- Mantener el código sencillo, organizado por responsabilidades y con nombres claros.
- Validar entradas e imágenes; proteger datos y no guardar claves ni secretos en el código.
- Probar funcionalidades principales y criterios observables en la aplicación.
- Respetar la especificación aprobada; no añadir funciones fuera de su alcance.

Las reglas de producto viven en .specify/memory/constitution.md y el estado del producto en specs/README.md
