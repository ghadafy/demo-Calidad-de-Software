# demo-Calidad-de-Software

demo para verificar la calidad de una aplicacion basica

Bookshelf App

Aplicación web para registrar libros leídos, con estadísticas y un gráfico visual de recomendación.

Funcionalidades

- Registro de nuevos usuarios con nombre, usuario y contraseña cifrada.
- Inicio de sesión con validación y control de sesión activa.
- Agregar libros leídos con título, autor, páginas y si lo recomienda.
- Visualización de libros en una tabla editable.
- Estadísticas automáticas:
  - Total de libros leídos
  - Promedio de páginas
- Gráfico simple de barras: libros recomendados vs no recomendados.
- Control de sesión: redirección automática si no hay sesión activa.
- Toda la información se almacena en `localStorage`.

Instrucciones de uso

1. Abre `index.html` o `login.html` en tu navegador.
2. **Regístrate** con nombre, usuario y contraseña.
3. **Inicia sesión** para acceder al dashboard.
4. En el dashboard puedes:
   - Agregar libros leídos.
   - Visualizar estadísticas y el gráfico.
   - Cerrar sesión en cualquier momento.

Esta aplicación funciona completamente en el navegador. Todos los datos se almacenan usando `localStorage`, por lo que se mantienen aunque cierres el navegador.

Requisitos

- Navegador moderno (Chrome, Firefox, Edge).
- No se necesita conexión a internet ni servidor web.

Autor
Ghadafy Neville — Proyecto académico para practicar JavaScript (Vanilla, con patron de diseño modular), manipulación del DOM, validaciones y almacenamiento local.
