const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
// 🛡️ IMPORTACIONES DE SEGURIDAD (Rúbrica punto 3 y 6)
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); // Para encriptar contraseñas

const Project = require('./models/Project');
const User = require('./models/User');
const Post = require('./models/Post');

require('dotenv').config(); // Asegúrate de tener esto si usas .env local

const app = express();

// --- SEGURIDAD ---
// 1. Helmet: Protege cabeceras HTTP (Anti XSS, etc.)
app.use(helmet());

// 2. Rate Limit: Evita ataques de fuerza bruta (máx 100 peticiones por 15 min)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: "Demasiadas peticiones desde esta IP, intenta de nuevo en 15 minutos."
});
app.use(limiter);

// 3. CORS Configurado
app.use(cors()); 

app.use(express.json());

const JWT_SECRET = 'secreto_super_seguro'; // Idealmente usa process.env.JWT_SECRET

// --- CONEXIÓN MONGODB ---
mongoose.connect('mongodb+srv://KevinSex08:kevin123@cluster0.a1ydets.mongodb.net/portafolio?retryWrites=true&w=majority')
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error de conexión:', err));

// --- MIDDLEWARE VERIFICAR TOKEN ---
const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Acceso denegado' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });
        req.user = user;
        next();
    });
};

// ================= RUTAS =================

// 1. LOGIN (Ahora con bcrypt para comparar contraseñas encriptadas)
app.post('/api/login', 
  // 🛡️ VALIDACIÓN DE ENTRADA (express-validator)
  [
    body('username').notEmpty().withMessage('Usuario requerido'),
    body('password').notEmpty().withMessage('Contraseña requerida')
  ],
  async (req, res) => {
    // Revisar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    // Verificamos si existe el usuario
    if (!user) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // 🛡️ COMPARACIÓN SEGURA (bcrypt)
    // Compara la contraseña texto plano con la encriptada en BD
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
});

// 2. RUTAS PÚBLICAS
app.get('/api/projects', async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});

app.get('/api/posts', async (req, res) => {
    const posts = await Post.find().sort({ fecha: -1 });
    res.json(posts);
});

// 3. RUTAS PRIVADAS (Crear)
app.post('/api/posts', verificarToken, async (req, res) => {
    const nuevoPost = new Post(req.body);
    await nuevoPost.save();
    res.status(201).json(nuevoPost);
});

// 4. RUTAS PRIVADAS (Actualizar/Editar) - <--- ¡NUEVO! ✅
app.put('/api/posts/:id', verificarToken, async (req, res) => {
    try {
        const postActualizado = await Post.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // Devuelve el post ya actualizado
        );
        res.json(postActualizado);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el post" });
    }
});

// 5. RUTAS PRIVADAS (Eliminar) - <--- ¡NUEVO! ✅
app.delete('/api/posts/:id', verificarToken, async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Post eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el post" });
    }
});


// --- 🚑 RUTA DE EMERGENCIA (ACTUALIZADA CON ENCRIPTACIÓN) ---
// Usaremos esta ruta UNA VEZ para crear tu usuario con contraseña encriptada
app.get('/crear-admin-seguro', async (req, res) => {
    try {
        await User.deleteOne({ username: 'kevin' });
        
        // 🛡️ ENCRIPTAR CONTRASEÑA ANTES DE GUARDAR
        const salt = await bcrypt.genSalt(10);
        const passwordEncriptada = await bcrypt.hash('kevin123', salt);

        const nuevoUsuario = new User({ 
            username: 'kevin', 
            password: passwordEncriptada // Guardamos el hash, no el texto plano
        });
        
        await nuevoUsuario.save();
        res.send("<h1>🎉 ¡ÉXITO! Usuario 'kevin' creado con contraseña ENCRIPTADA.</h1>");
    } catch (error) {
        res.send(`<h1>❌ Error: ${error.message}</h1>`);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor (Seguro) corriendo en el puerto ${PORT}`);
});
// Forzando actualización de Render...