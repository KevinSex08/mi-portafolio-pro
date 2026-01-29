🚀 Portafolio Profesional Full-Stack (MERN)
Este proyecto es una aplicación web moderna diseñada para presentar mi perfil profesional, proyectos destacados y un blog técnico. Cuenta con un Panel de Administración seguro que permite gestionar (Crear, Leer, Editar y Eliminar) el contenido dinámicamente.

🔗 Enlaces de Despliegue
Frontend (Vercel): 🔗 Pega_Aquí_Tu_Link_De_Vercel (Reemplaza esto con tu link real)

Backend (Render): https://api-portafolio-kferazo.onrender.com

Repositorio GitHub: https://github.com/KevinSex08/mi-portafolio-pro

🛠️ Stack Tecnológico
El proyecto utiliza el stack MERN (MongoDB, Express, React, Node.js) elegido por su eficiencia, unificación del lenguaje (JavaScript en todo el entorno) y escalabilidad.

💻 Frontend
React + Vite: Para una construcción de interfaz ultra-rápida y modular.

Tailwind CSS: Diseño responsive y moderno sin la sobrecarga de hojas de estilo tradicionales.

React Router DOM: Manejo de rutas para una experiencia SPA (Single Page Application) fluida.

Context API / Hooks: Gestión del estado de la aplicación y la autenticación del administrador.

Fetch API: Comunicación asíncrona con el Backend.

⚙️ Backend
Node.js & Express: Servidor RESTful robusto y ligero.

Mongoose: ODM (Object Data Modeling) para esquematizar y validar datos en MongoDB.

JWT (JSON Web Tokens): Sistema de autenticación seguro y stateless (sin estado).

BcryptJS: Encriptación de contraseñas para máxima seguridad.

🛡️ Seguridad Implementada
Siguiendo las mejores prácticas de la industria y OWASP, se implementaron las siguientes capas de seguridad:

Helmet: Middleware que configura cabeceras HTTP seguras para prevenir ataques como XSS, Clickjacking y Sniffing.

Rate Limiting: Protección contra ataques de fuerza bruta y DDoS, limitando las peticiones a 100 por cada 15 minutos desde una misma IP.

CORS (Cross-Origin Resource Sharing): Configurado para aceptar peticiones solo desde orígenes confiables.

Validación de Datos (Express-validator): Sanitización estricta de entradas en el Login y creación de posts para evitar inyecciones NoSQL.

Hashing de Contraseñas: Las contraseñas nunca se guardan en texto plano; se utiliza bcryptjs con salt para encriptarlas.

💾 Justificación de Base de Datos
1. ¿Por qué se eligió NoSQL (MongoDB) sobre SQL?
Opté por MongoDB debido a la flexibilidad de su esquema (Schema-less). En un portafolio personal, la estructura de los datos puede evolucionar rápidamente.

Agilidad: A diferencia de SQL, donde añadir un campo nuevo requiere migraciones complejas (ALTER TABLE), MongoDB me permite iterar rápido. Si decido añadir "Tecnologías usadas" a mis proyectos mañana, puedo hacerlo sin romper la base de datos actual.

Naturaleza JSON: Al usar JavaScript en todo el stack (MERN), los datos fluyen en formato JSON desde el Frontend hasta la Base de Datos (BSON). Esto elimina la necesidad de ORMs complejos y hace el desarrollo mucho más natural.

2. ¿Cómo se adapta a las necesidades de un portafolio?
Un portafolio es una aplicación Read-Heavy (Intensiva en Lectura).

Rendimiento: El 99% del tráfico son usuarios leyendo el contenido. MongoDB es extremadamente eficiente recuperando documentos. Al cargar mi perfil, obtengo toda la información necesaria en una sola consulta, sin los costosos JOINs que requeriría una base de datos relacional.

Escalabilidad del Blog: Cada post del blog puede tener estructuras diferentes (distintas etiquetas, metadatos, imágenes), algo que el modelo de documentos de MongoDB maneja de forma nativa.

⚡ Instalación y Ejecución Local
Si deseas correr este proyecto en tu máquina, sigue estos pasos:

1. Clonar el repositorio
Bash
git clone https://github.com/KevinSex08/mi-portafolio-pro.git
cd mi-portafolio-pro
2. Configurar y correr el Backend
Bash
cd backend
npm install
Crea un archivo .env en la carpeta backend con lo siguiente:

Fragmento de código
PORT=5000
JWT_SECRET=tu_secreto_super_seguro
# Usa tu propia URL de conexión local o de Atlas
MONGO_URI=mongodb+srv://KevinSex08:kevin123@cluster0.a1ydets.mongodb.net/portafolio
Iniciar servidor:

Bash
node index.js
3. Configurar y correr el Frontend
En una nueva terminal:

Bash
cd frontend
npm install
npm run dev