const express = require('express');
const cors = require('cors');

// Crear la app (el restaurante)
const app = express();
const PUERTO = 5000;

// Middleware (El portero que deja pasar datos)
app.use(cors());
app.use(express.json());

// Una ruta de prueba (Para ver si funciona)
app.get('/', (req, res) => {
  res.send('¡Hola! El servidor está funcionando correctamente 🚀');
});

// Prender el servidor
app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});