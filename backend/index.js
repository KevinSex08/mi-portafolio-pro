require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Importamos la seguridad
const Project = require('./models/Project');
const User = require('./models/User'); // Importamos al usuario

const app = express();
const PUERTO = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Conexión a Base de Datos
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('¡Conectado a MongoDB! 🍉'))
  .catch((err) => console.error(err));

// --- MIDDLEWARE DE SEGURIDAD (El Guardia) ---
// Esta función revisa si traes la "pulsera" (Token)
const verificarToken = (req, res, next) => {
  const token = req.headers['authorization']; 
  
  if (!token) return res.status(403).json({ error: "¡Alto ahí! No tienes permiso (Falta Token)" });

  try {
    const decodificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decodificado;
    next(); // Pasa, todo bien
  } catch (error) {
    res.status(401).json({ error: "Token falso o expirado" });
  }
};

// --- RUTAS PÚBLICAS (Cualquiera puede verlas) ---

app.get('/', (req, res) => {
  res.send('API Funcionando 🚀');
});

// Ver proyectos (GET) - Esto debe ser público para que la gente vea tu portafolio
app.get('/api/projects', async (req, res) => {
  const proyectos = await Project.find();
  res.json(proyectos);
});

// Login (POST) - Aquí canjeas usuario/contraseña por un Token
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Buscamos al usuario admin
  const user = await User.findOne({ username });
  
  // Si no existe o la contraseña está mal
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }

  // Si todo ok, creamos el token
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.json({ token, username: user.username });
});

// --- RUTAS PRIVADAS (Solo el Admin entra) ---

// Guardar proyecto (POST) - ¡AHORA TIENE CANDADO! (verificarToken)
app.post('/api/projects', verificarToken, async (req, res) => {
  try {
    const nuevoProyecto = new Project(req.body);
    await nuevoProyecto.save();
    res.json(nuevoProyecto);
  } catch (error) {
    res.status(500).json({ error: "Error al guardar" });
  }
});

app.listen(PUERTO, () => {
  console.log(`Servidor seguro corriendo en puerto ${PUERTO} 🔒`);
});