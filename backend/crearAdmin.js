require('dotenv').config(); // Carga el archivo .env
const mongoose = require('mongoose');
const User = require('./models/User');

const crearAdmin = async () => {
  try {
    // Usamos la variable del archivo .env
    const dbUrl = process.env.MONGO_URI;

    if (!dbUrl) {
      console.error("❌ ERROR: No encuentro la variable MONGO_URI en el archivo .env");
      return;
    }

    await mongoose.connect(dbUrl);
    console.log("✅ Conectado a la BD...");

    // 1. Borramos usuario viejo
    await User.deleteMany({ username: 'kevin' });

    // 2. Creamos usuario nuevo
    const nuevoAdmin = new User({
      username: 'kevin',
      password: 'kevin123'
    });

    await nuevoAdmin.save();
    console.log("🎉 ¡Usuario 'kevin' creado con éxito!");
    
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error grave:", error);
  }
};

crearAdmin();