<!--
Sync Impact Report
- Version change: none → 1.0.0 (initial ratification)
- Modified principles: none; eight project principles established
- Added sections: Additional Constraints; Development Workflow; Governance rules
- Removed sections: none
- Follow-up TODOs: none
-->

# Rheyf Store Constitution

## Core Principles

### I. Simplicidad ante todo
La primera versión MUST incluir únicamente la funcionalidad necesaria y aprobada para
cumplir su propósito. Cada complejidad adicional MUST justificarse en la especificación;
si no aporta valor aprobado, MUST omitirse. Esto reduce el costo de desarrollo y
mantenimiento.

### II. Idioma y mercado peruano
Toda interfaz, contenido y mensaje visible MUST estar en español de Perú. Los precios
MUST mostrarse en soles peruanos con el símbolo S/. Las validaciones y formatos
presentados a las personas usuarias MUST ser coherentes con ese mercado.

### III. Cero alcance fantasma
El equipo MUST implementar solo funcionalidades definidas y aprobadas en la
especificación vigente. Toda solicitud nueva MUST incorporarse y aprobarse mediante el
flujo de especificación antes de su implementación. Así, el alcance es acordado y
trazable.

### IV. Diseño consistente
La interfaz MUST respetar el prototipo visual aprobado de Rheyf Store. La paleta base
MUST usar fondo negro y gris oscuro, texto blanco, azul eléctrico para botones y
elementos destacados, y verde para las acciones de WhatsApp. Cualquier cambio visual
MUST actualizarse y aprobarse en el prototipo correspondiente.

### V. Funcionalidad verificable
Cada criterio de éxito MUST poder comprobarse mediante el comportamiento observable de
la aplicación, sin inspeccionar el código. Las especificaciones MUST describir pasos o
resultados observables suficientes para verificar cada criterio.

### VI. Datos y seguridad
Los datos recibidos MUST validarse antes de usarse o almacenarse. El sistema MUST
proteger la información según su sensibilidad y MUST evitar exponer datos personales
innecesarios. Claves, credenciales y otros secretos MUST almacenarse fuera del código
fuente y no incluirse en repositorios.

### VII. Código mantenible
El código MUST organizarse por responsabilidades, usar nombres claros y evitar
duplicaciones innecesarias. Las decisiones que añadan complejidad estructural MUST
justificarse por una necesidad aprobada, para que el sistema pueda evolucionar con
cambios acotados.

### VIII. Pruebas y desarrollo incremental
El trabajo MUST avanzar por fases definidas y completar los criterios de aceptación
de una fase antes de iniciar la siguiente. Las funcionalidades principales MUST
probarse mediante verificaciones apropiadas y reproducibles antes de considerarse
terminadas.

## Additional Constraints

- Las especificaciones aprobadas son la fuente de verdad del alcance funcional y de
  los criterios de aceptación.
- La interfaz MUST mantener los contrastes y colores del prototipo aprobado, incluidas
  las acciones de WhatsApp en verde.
- Los importes MUST conservar su significado monetario en soles peruanos en toda
  presentación a la persona usuaria.
- Las configuraciones sensibles MUST suministrarse mediante mecanismos externos al
  código fuente.

## Development Workflow

- Antes de implementar una funcionalidad, MUST existir una especificación aprobada que
  la describa y establezca criterios de aceptación observables.
- Cada fase MUST producir un resultado verificable y cumplir sus criterios de
  aceptación antes de avanzar.
- Los cambios MUST incluir las pruebas adecuadas a la funcionalidad afectada. Las
  verificaciones principales MUST cubrir los criterios de éxito desde la aplicación.
- Las revisiones MUST comprobar alcance, idioma y formatos peruanos, consistencia con
  el prototipo, validación y protección de datos, mantenibilidad y resultados de las
  pruebas.

## Governance

Esta constitución gobierna las decisiones de producto, especificación, diseño,
implementación y revisión de Rheyf Store. Una práctica o decisión incompatible con
estos principios MUST corregirse o quedar bloqueada hasta que se apruebe una enmienda.

Toda enmienda MUST proponerse y aprobarse por las personas responsables del proyecto,
actualizar esta constitución y registrar el motivo y el impacto en las especificaciones,
el flujo de trabajo y las revisiones afectadas. La aprobación de una enmienda no
autoriza por sí misma funcionalidades fuera de la especificación vigente.

La versión sigue SemVer: MAJOR para cambios incompatibles en principios o reglas;
MINOR para principios o secciones nuevas y ampliaciones sustantivas compatibles; PATCH
para aclaraciones y correcciones que no cambian obligaciones. Las revisiones de
especificaciones y cambios de producto MUST comprobar su cumplimiento con esta
constitución. Toda excepción MUST documentarse y aprobarse junto con la enmienda que
la autoriza.

**Version**: 1.0.0 | **Ratified**: 2026-10-26 | **Last Amended**: 2026-10-26
