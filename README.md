# Rheyf Store

Prototipo de catálogo de productos variados con carrito y pedidos coordinados por
WhatsApp. Interfaz en español de Perú, precios en soles (S/) y diseño oscuro con azul
eléctrico; verde se reserva para WhatsApp.

## Requisitos

- Node.js 24.15 o superior y npm.
- El número de WhatsApp de la tienda está en `src/config/store.js` como `930138447`.
  Puede sustituirse mediante `VITE_WHATSAPP_PHONE_NUMBER` en `.env`; la aplicación
  agrega el prefijo peruano `51` al crear el enlace.
- El servidor crea la base SQLite en `server/data/rheyf-store.db` por defecto.

La aplicación accede a SQLite desde su API local Express usando el módulo integrado
`node:sqlite`. La guía del laboratorio no se encontró en el repositorio; el detalle de
esta decisión está en `specs/001-tienda-whatsapp/plan.md`.

## Instalar y ejecutar

```powershell
npm install
npm run server
```

En otra terminal desde la raíz, inicia Vite:

```powershell
npm run dev
```

Abre la URL local que muestra Vite. Para modificar el teléfono, cambia
`src/config/store.js` o configura `VITE_WHATSAPP_PHONE_NUMBER` en un `.env` local.

## Pruebas y build

```powershell
npm test
npm run build
```

Las pruebas unitarias cubren filtros, carrito, formato/enlace WhatsApp y validación;
las de integración cubren el catálogo y el CRUD básico de productos contra SQLite
temporal.

## Alcance

Incluye inicio, catálogo con búsqueda y filtros, detalle, carrito, confirmación,
preparación del mensaje editable de WhatsApp y administración demostrativa de
productos. No incluye pagos en línea, autenticación administrativa ni persistencia de
pedidos.
