require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

// --- TUS DATOS (CÁMBIALOS AQUÍ) ---
const MI_USUARIO = "kevin"; 
const MI_PASSWORD = "kevin123"; 
// ----------------------------------

const crearAdmin = async () => {
  try {
    // Conectamos a la Base de Datos
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a la BD...");

    // 1. Borramos si ya existía algún admin (para no tener duplicados)
    await User.deleteMany({ username: MI_USUARIO });

    // 2. Te creamos a ti
    const nuevoAdmin = new User({
      username: MI_USUARIO,
      password: MI_PASSWORD
    });

    await nuevoAdmin.save();
    console.log("¡Usuario Admin Creado con Éxito! 👮‍♂️ Ya puedes cerrar este archivo.");
    
    mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error);
  }
};

crearAdmin();