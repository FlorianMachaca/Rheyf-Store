# Investigación técnica: Tienda y pedidos por WhatsApp

**Fecha**: 2026-10-26

## React y Vite

- **Decisión**: Usar la plantilla JavaScript oficial de React para Vite. Mantener las
  pantallas y componentes por responsabilidad; conservar el estado compartido en el
  ancestro común más pequeño y derivar subtotales y totales desde carrito y productos.
- **Motivo**: Es el stack prescrito por `AGENTS.md`, aprovecha el prototipo visual y
  evita un gestor global de estado hasta que exista una necesidad demostrada.
- **Alternativas consideradas**: Agregar TypeScript o una biblioteca de estado. No
  están exigidos y no son necesarios para el alcance aprobado.
- **Referencias**: [Vite: Getting Started](https://vite.dev/guide/),
  [React: Thinking in React](https://react.dev/learn/thinking-in-react) y
  [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure).
  La guía actual de Vite especifica Node.js 20.19+ o 22.12+.

## Acceso de React a SQLite

- **Hallazgo**: `AGENTS.md` exige SQLite, pero ni la guía del laboratorio ni archivos
  de aplicación/configuración están presentes en el repositorio. React + Vite ejecuta
  la interfaz en el navegador; eso no define por sí solo cómo llega a una base SQLite
  persistente.
- **Decisión**: Usar un servidor local pequeño con Express y el módulo integrado
  `node:sqlite`; Vite proxya `/api` durante desarrollo. SQLite guarda productos y la
  imagen binaria en la misma base. Node 24.19.0 y npm 11.17.0 están instalados; se
  verificó que `node:sqlite` abre una base en memoria y ejecuta consultas.
- **Motivo**: La interfaz web no abre el archivo SQLite directamente; el proceso local
  permite compartir catálogo entre administración y tienda, con una sola API pequeña.
  El módulo integrado evita agregar un controlador nativo y requerir herramientas de
  compilación C++ en esta máquina. La opción exige Node 24.15+ según la versión del
  módulo seleccionada.
- **Alternativa considerada**: SQLite WebAssembly con persistencia del navegador.
  SQLite documenta esta posibilidad, pero OPFS requiere un Worker y la persistencia
  depende de capacidades y políticas del navegador. Eso añade complejidad y deja los
  datos locales a cada navegador.
- **Límite**: La guía del laboratorio no está disponible localmente. La arquitectura
  es la elección mínima para avanzar, no una afirmación de compatibilidad con una guía
  que no se pudo consultar. Revisarla antes de cualquier despliegue formal.
- **Seguridad**: enlazar el servidor a loopback, validar datos y tamaño/MIME en
  servidor, guardar imagen como BLOB, y parametrizar consultas. No hay datos personales
  ni autenticación admin en el alcance.
- **Referencia**: [Node.js SQLite](https://nodejs.org/api/sqlite.html),
  [SQLite WebAssembly](https://sqlite.org/wasm/doc/trunk/index.md) y
  [opciones de persistencia SQLite WASM](https://sqlite.org/wasm/doc/trunk/persistence.md).
  [Express](https://github.com/expressjs/express).

## Pruebas

- **Decisión**: Vitest prueba las reglas de catálogo, carrito, formulario y enlace de
  WhatsApp; pruebas de integración cubren la API/CRUD sobre SQLite temporal.
- **Resultado actual**: `npm test` pasa 17 pruebas en 6 archivos; `npm run build`
  compila correctamente. La API local y el servidor Vite respondieron en la
  comprobación de ejecución. No se agregó un framework de pruebas de navegador.
- **Límite**: los recorridos visuales completos y la apertura real de WhatsApp requieren
  revisión manual en celular y computadora. El enlace y el mensaje se verifican con
  pruebas unitarias, sin enviar mensajes.
- **Referencia**: [Vitest: Getting Started](https://vitest.dev/guide/).

## Enlace de WhatsApp

- **Decisión**: Preparar un enlace click-to-chat con el número configurado de la tienda
  y el mensaje codificado en la URL. La persona revisa, puede editar y envía desde
  WhatsApp; Rheyf Store no envía el mensaje ni confirma la compra.
- **Motivo**: Coincide con el prototipo y con FR-012/FR-013; no requiere API de envío,
  pagos ni una cuenta integrada.
- **Validación**: probar la normalización del número 930138447 a 51930138447 y verificar
  saludo, nombre de tienda, productos, cantidades, precios unitarios, subtotales, total
  y solicitud de entrega. No enviar mensajes durante las pruebas.
- **Configuración**: `src/config/store.js` define el valor inicial 930138447; la
  variable `VITE_WHATSAPP_PHONE_NUMBER` puede reemplazarlo.
- **Referencia**: [WhatsApp Help Center: How to use click to chat](https://faq.whatsapp.com/5913398998672934).

## Alcance local comprobado

El repositorio contiene `package.json`, configuración React/Vite, servidor Express con
`node:sqlite`, pruebas unitarias y de integración, `README.md` y `quickstart.md`.
La guía del laboratorio no se encontró; la arquitectura elegida es una alternativa
local documentada y no una afirmación de compatibilidad comprobada con esa guía.
