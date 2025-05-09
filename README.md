# Fasti_PT_Client 🛒

Frontend del sistema de punto de venta desarrollado como parte de la prueba técnica para **Abarrotes FASTI S.A. de C.V.**

Este cliente web permite a los usuarios (cajeros y gerente) interactuar con el sistema de ventas, control de inventario, registro de compras y generación de cortes diarios.

---

## 📌 Características principales

- Autenticación de usuarios por rol (Gerente y Cajero).
- Visualización y búsqueda de productos del inventario.
- Registro de ventas (cajeros).
- Registro de compras (gerente).
- Generación de cortes de venta por turno o día.

---

## 🚀 Tecnologías utilizadas

| Herramienta      | Descripción                                                                 |
|------------------|-----------------------------------------------------------------------------|
| **React**        | Biblioteca para construir interfaces de usuario rápidas y dinámicas         |
| **Vite**         | Empaquetador moderno que acelera el desarrollo frontend                     |
| **JavaScript**   | Lenguaje principal para lógica y manipulación del estado                    |
| **Tailwind CSS** | Framework de estilos para crear interfaces limpias y responsivas            |
| **Axios**        | Cliente HTTP para consumir la API backend                                   |
| **React Router** | Manejo de rutas y navegación entre vistas                                   |

---

## ⚙️ Requisitos para instalación

- Node.js v18 o superior
- npm v9 o superior
- Navegador moderno (Chrome, Firefox, Edge)

---

## 📦 Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Alba2809/Fasti_PT_Client.git
   cd Fasti_PT_Client
   ```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

   ```bash
   VITE_BACKEND_URL=http://localhost:8000
   ```

   > Esta variable es necesaria para conectarse al backend. Puedes cambiarla si es necesario.

4. Instala las dependencias:

   ```bash
   npm install
   ```

5. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

6. Accede desde el navegador:

   ```
   http://localhost:5173
   ```

---

## 🔑 Roles de acceso

- **Gerente**
  - Ver y registrar compras.
  - Consultar productos.
  - Generar cortes de venta.
  - Ver y registrar ventas.
- **Cajero**
  - Ver y registrar ventas.
  - Consultar inventario.
  - Generar cortes de venta.

---

## 📸 Capturas

**...**

---

## 📄 Licencia

Este proyecto fue desarrollado exclusivamente para fines de evaluación técnica.  
No está destinado a producción ni distribución comercial.

---

Desarrollado por **José Iván Alba García**  
Prueba técnica — 06 de mayo de 2025