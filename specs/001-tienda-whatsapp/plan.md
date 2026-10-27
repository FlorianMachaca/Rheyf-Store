# Implementation Plan: Rheyf Store

**Branch**: `001-tienda-whatsapp` | **Date**: 2026-10-26 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-tienda-whatsapp/spec.md`

## Summary

Construir el prototipo de tienda con React + Vite, con catálogo, detalle, carrito,
confirmación, administración básica y enlace manual a WhatsApp. La base exigida es
SQLite. Para resolver la conexión sin exponer el archivo de base de datos al navegador,
la interfaz usa un servidor local pequeño de Node/Express y el módulo integrado
`node:sqlite`. La guía
del laboratorio no está en el repositorio; esta decisión mínima sigue pendiente de
comparación con la guía cuando esté disponible.

## Technical Context

**Language/Version**: JavaScript con módulos ES; Node.js 24.19.0 está instalado y
probado con `node:sqlite`. Se requiere Node.js 24.15+ para el conjunto elegido.

**Primary Dependencies**: React, Vite y Express. SQLite usa `node:sqlite`, integrado
en Node; Vitest cubre pruebas automatizadas acotadas. No se agrega ORM ni biblioteca de
estado global.

**Storage**: SQLite en `server/data/rheyf-store.db`, acceso exclusivo desde el proceso
local Express y consultas parametrizadas. Imágenes PNG/JPG de hasta 5 MB se guardan
como BLOB junto a su MIME; el carrito no se persiste.

**Testing**: Vitest para reglas unitarias y pruebas de integración de catálogo/CRUD
contra SQLite temporal. `npm test` pasa 17 pruebas; `npm run build` compila la interfaz.
La comprobación local confirmó respuesta de la API y Vite. El número de WhatsApp no
está configurado y no se afirma que se haya comprobado una apertura real en WhatsApp.
Los recorridos completos de interfaz en navegador siguen siendo una verificación manual.

**Target Platform**: Navegadores actuales en escritorio y móvil; entorno local Node.js
24.15+ para Vite, Express y `node:sqlite`.

**Project Type**: Aplicación web de prototipo con frontend React/Vite y un servidor
local Node/Express como adaptador SQLite.

**Performance Goals**: Sin metas de latencia o concurrencia solicitadas; validar el
uso correcto de los recorridos del prototipo con un catálogo pequeño.

**Constraints**: UI en español de Perú y precios en soles; tema negro/gris, texto
claro, azul eléctrico para acciones generales y verde solo para WhatsApp. Sin pagos,
autenticación administrativa, usuarios, roles ni historial de pedidos. Validar
entradas, no incluir secretos y mantener visible la diferencia entre pedido preparado
y mensaje enviado.

**Scale/Scope**: Prototipo de baja escala para catálogo, compra por coordinación
manual y mantenimiento demostrativo de productos; sin objetivos de disponibilidad o
volumen definidos.

## Constitution Check

| Principio | Evaluación del plan |
|---|---|
| Simplicidad ante todo | PASS: una interfaz Vite y un servidor local Express pequeño; sin ORM, estado global, autenticación ni envío de WhatsApp por API. |
| Idioma y mercado peruano | PASS: toda la interfaz en español de Perú; presentación de importes en S/. |
| Cero alcance fantasma | PASS: solo los escenarios y requisitos de `spec.md`; sin pago ni autenticación. |
| Diseño consistente | PASS: colores y jerarquía visual tomados de la imagen aprobada; verde reservado a WhatsApp. |
| Funcionalidad verificable | PASS: criterios funcionales probados mediante la UI y escenarios reproducibles. |
| Datos y seguridad | PASS CON LÍMITE APROBADO: administración sin autenticación como exige el prototipo; no se recogen datos personales; validar entradas, limitar imágenes y usar consultas parametrizadas. |
| Código mantenible | PASS: responsabilidades separadas entre pantallas, componentes y reglas de catálogo/carrito; sin duplicar totales derivados. |
| Pruebas y desarrollo incremental | PASS: verificar recorrido por fases y antes de avanzar; la guía rápida lista resultados esperados. |

**Decisión técnica**: el repositorio no incluye la guía del laboratorio. Se adopta
temporalmente un servidor local mínimo Express + `node:sqlite`, revisable contra la
guía antes de cualquier despliegue del laboratorio. No se exponen archivos SQLite al
navegador ni se añade infraestructura de producción.

## Project Structure

### Documentation (this feature)

```text
specs/001-tienda-whatsapp/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui-contracts.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
index.html
src/
├── main.jsx
├── App.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── CatalogPage.jsx
│   ├── ProductDetailPage.jsx
│   ├── CartPage.jsx
│   ├── OrderConfirmationPage.jsx
│   └── AdminProductsPage.jsx
├── components/
│   ├── SiteHeader.jsx
│   ├── ProductCard.jsx
│   ├── ProductForm.jsx
│   ├── CartLine.jsx
│   └── EmptyState.jsx
├── features/
│   ├── products/       # validación y reglas de producto
│   └── cart/           # cantidades, disponibilidad y totales derivados
├── services/
│   ├── productApi.js   # llamadas a /api/products y /api/categories
│   └── whatsappLink.js # preparar enlace y mensaje, sin enviarlo
└── styles/
    └── theme.css       # colores y estilos del prototipo

server/
├── index.js            # Express, API y estáticos de producción
├── database.js         # abrir SQLite y crear tablas/seed
├── productRepository.js # consultas parametrizadas para productos
└── routes/
    └── products.js     # listar, detalle y CRUD de productos
tests/
├── unit/               # reglas de carrito, producto y enlace WhatsApp
└── integration/        # API y persistencia SQLite temporal
```

La estructura no incluye categorías administrables, pedidos persistentes, usuarios ni
autenticación. SQLite se ejecuta en el mismo equipo que el servidor local.

**Structure Decision**: Aplicación Vite de raíz única más proceso local Express. Vite
proxya `/api` al servidor durante desarrollo; Express sirve `dist/` al iniciar la
versión construida. La guía del laboratorio no está disponible para confirmar o
contradecir esta decisión.

## Responsabilidades técnicas

- **App y navegación**: conectar inicio, catálogo, detalle, carrito, confirmación y
  vista administrativa de productos; sin incorporar rutas/páginas de categorías,
  pedidos, usuarios o configuración.
- **Administración de productos**: incluir búsqueda por nombre y filtro por categoría,
  además del listado y las operaciones básicas del catálogo.
- **Páginas y componentes**: presentar el estado observable, estados vacíos y errores;
  usar los colores del prototipo y etiquetas en español.
- **Reglas de productos**: validar nombre, categoría, descripción, precio > 0,
  disponibilidad e imagen PNG/JPG ≤ 5 MB antes de guardar.
- **Reglas del carrito**: mantener productos y cantidades durante el recorrido; derivar
  subtotales y total desde precio en céntimos y cantidad; impedir cantidades menores
  que uno y confirmar productos disponibles únicamente.
- **Acceso a datos**: el cliente usa `src/services/productApi.js`; Express ofrece
  operaciones acotadas de producto/categorías y `server/productRepository.js` accede
  a SQLite con `node:sqlite` y consultas parametrizadas. El navegador nunca abre el
  archivo SQLite.
- **WhatsApp**: preparar enlace click-to-chat al número configurado, codificar el
  mensaje en UTF-8 y dejar su envío bajo control de la persona. No añadir API de envío.
- **Imágenes**: el cliente envía el contenido como data URL; el servidor valida MIME y
  máximo 5 MB, almacena bytes y MIME como BLOB en SQLite y devuelve una URL de datos.

## Manejo de errores y validación

- Formularios: prevenir guardado si falta un campo requerido, precio no numérico o
  menor/igual a cero, archivo ajeno a PNG/JPG o archivo superior a 5 MB; señalar qué
  debe corregirse en español.
- Catálogo: informar sin resultados y ofrecer limpiar búsqueda/restaurar categorías.
- Carrito: mostrar estado vacío; marcar producto eliminado/no disponible e impedir
  confirmar hasta quitarlo o restaurar disponibilidad.
- Persistencia: mostrar un mensaje entendible si una operación de catálogo falla; no
  indicar que se guardó un cambio cuando SQLite no lo confirmó.
- WhatsApp: si el enlace no puede abrirse, conservar el resumen y ofrecer una
  indicación simple para intentar desde un dispositivo compatible; nunca mostrar
  “enviado” por el mero hecho de abrir WhatsApp.
- Eliminar: confirmar antes de borrar; cancelar conserva el producto.

## Estrategia de pruebas

1. **Reglas**: probar búsqueda sin distinción de mayúsculas, filtro de categoría,
   validación de producto, cálculo de subtotal/total y bloqueo de datos inválidos.
2. **Componentes**: probar formulario y líneas de carrito en los estados disponible,
   no disponible, vacío, error y cancelación.
3. **Persistencia**: comprobar alta/edición/eliminación y que el catálogo refleja los
   cambios tras recargar; las pruebas de integración usan una base SQLite temporal.
4. **Recorridos de aceptación**: completar en navegador los flujos FR-001 a FR-020 de
   `spec.md`; comparar pantallas con la imagen y comprobar idioma, colores y soles.
5. **WhatsApp**: probar móvil/escritorio con destinatario configurado; revisar tildes,
   saltos de línea, artículos, cantidades, precios y total; no enviar automáticamente.
6. No se incluye prueba de pago, usuarios, autenticación ni funcionalidades fuera del
   alcance aprobado.

## Comandos de desarrollo y validación

Con Node.js 24.15+ y npm instalados, ejecutar `npm install`, `npm run server` y
`npm run dev` en dos terminales; `npm test` ejecuta las pruebas y `npm run build`
compila la interfaz. `.env.example` documenta las variables locales. La guía del
laboratorio no está disponible en el repositorio, por lo que el servidor Express local
con `node:sqlite` queda como decisión técnica documentada pendiente de cotejo con esa
guía.

## Complexity Tracking

No hay excepciones a la constitución aprobadas. El servidor local es una decisión
técnica acotada para conectar el frontend con SQLite; confirmar que la guía del
laboratorio la permita. No se agregan SQLite WASM, almacenamiento de imágenes
separado, API de envío de WhatsApp ni autenticación.
