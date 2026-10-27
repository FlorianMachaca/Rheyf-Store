# Guía local de ejecución y validación: Rheyf Store

La guía del laboratorio no está incluida en el repositorio. Esta versión usa una API
local Express con SQLite mediante el módulo integrado `node:sqlite`.

## Requisitos

- Node.js 24.15 o superior y npm.
- Número de WhatsApp de la tienda en formato internacional, configurado localmente
  como `VITE_WHATSAPP_PHONE_NUMBER`.
- Acceso de escritura a la carpeta para crear `server/data/rheyf-store.db`.

## Instalar dependencias

Desde la raíz del proyecto:

```powershell
npm install
```

## Iniciar en desarrollo

Abrir dos terminales desde la raíz:

```powershell
npm run server
```

```powershell
npm run dev
```

El servidor local inicia la API y SQLite; Vite inicia la interfaz y proxya las
solicitudes `/api` al servidor.

## Ejecutar pruebas y construir

```powershell
npm test
npm run build
```

Las pruebas unitarias cubren filtros, carrito, validación y enlace WhatsApp. Las
pruebas de integración verifican lectura y CRUD contra SQLite en memoria.

## Comprobaciones manuales

1. Abrir la URL local que informa Vite; verificar inicio, catálogo y cuatro categorías.
2. Buscar y filtrar; abrir un detalle y revisar imagen, disponibilidad, descripción y precio en soles.
3. Agregar productos, cambiar cantidades, eliminar artículos y contrastar el total.
4. En administración, crear, editar, marcar no disponible y eliminar productos; verificar validaciones y persistencia tras recargar.
5. Configurar el teléfono de WhatsApp en `.env`, preparar un pedido y revisar el texto precargado. Editar o enviar queda a decisión de la persona.
6. Comparar con la referencia: fondo negro/gris, texto claro, azul eléctrico y verde solo para la acción de WhatsApp.

No hay pagos, autenticación administrativa ni historial de pedidos.
