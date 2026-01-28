const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // <--- 1. IMPORTAMOS CORS

// Importamos los modelos
const Project = require('./models/Project');
const User = require('./models/User');
const Post = require('./models/Post'); // <--- Modelo del Blog

const app = express();

// --- CONFIGURACIONES ---
// 2. USAMOS CORS (Permite que el Frontend 5173 hable con este Backend 5000)
app.use(cors()); 

app.use(express.json());

// Clave secreta para el token
const JWT_SECRET = 'secreto_super_seguro';

// --- CONEXIÓN A MONGODB ---
// Usamos tu dirección que ya tiene el usuario correcto
mongoose.connect('mongodb+srv://KevinSex08:kevin123@cluster0.a1ydets.mongodb.net/portafolio?retryWrites=true&w=majority')
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error de conexión:', err));

// --- MIDDLEWARE DE SEGURIDAD (Verifica el Token) ---
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

// 1. LOGIN
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
});

// 2. PROYECTOS (Público)
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener proyectos" });
    }
});

// 3. PROYECTOS (Privado)
app.post('/api/projects', verificarToken, async (req, res) => {
    try {
        const nuevoProyecto = new Project(req.body);
        await nuevoProyecto.save();
        res.status(201).json(nuevoProyecto);
    } catch (error) {
        res.status(500).json({ error: "Error al guardar proyecto" });
    }
});

// 4. BLOG (Público)
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ fecha: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Error al traer los posts" });
    }
});

// 5. BLOG (Privado)
app.post('/api/posts', verificarToken, async (req, res) => {
    try {
        const nuevoPost = new Post({
            titulo: req.body.titulo,
            contenido: req.body.contenido,
            imagen: req.body.imagen
        });
        await nuevoPost.save();
        res.status(201).json(nuevoPost);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el post" });
    }
});

// --- 🚑 RUTA DE EMERGENCIA (La magia para crear tu usuario) ---
app.get('/crear-admin-urgente', async (req, res) => {
    try {
        // Esto creará el usuario "kevin" con contraseña "kevin123"
        await User.deleteOne({ username: 'kevin' }); // Borra el viejo si existe
        
        const nuevoUsuario = new User({ 
            username: 'kevin', 
            password: 'kevin123' 
        });
        
        await nuevoUsuario.save();
        res.send("<h1>🎉 ¡ÉXITO! Usuario 'kevin' creado. Ya puedes ir a loguearte.</h1>");
    } catch (error) {
        res.send(`<h1>❌ Error: ${error.message}</h1>`);
    }
});

// --- INICIAR SERVIDOR ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
