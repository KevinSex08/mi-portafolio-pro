import { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Para mostrar que está cargando

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Empieza a cargar
    
    try {
        // IMPORTANTE: Usa TU link de Render aquí
        const respuesta = await fetch('https://api-portafolio-kferazo.onrender.com/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
    
        const data = await respuesta.json();
    
        if (respuesta.ok) {
          localStorage.setItem('token', data.token);
          onLogin();
        } else {
          alert("Error: " + data.error);
        }
    } catch (error) {
        alert("Error de conexión. El servidor puede estar despertando.");
    }
    setLoading(false); // Termina de cargar
  };

  return (
    // Contenedor principal: centra todo en la pantalla y fondo oscuro
    <div className="flex items-center justify-center min-h-[80vh]">
      
      {/* La tarjeta del Login */}
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-2xl border border-purple-900/50 relative overflow-hidden">
        
        {/* Un efecto de luz de neón morada arriba */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800"></div>

        <div className="text-center">
          {/* Título con degradado Morado a Rosa */}
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Acceso Seguro 🔐
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Identifícate para gestionar tu portafolio
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={manejarSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              {/* Input moderno oscuro */}
              <input 
                type="text" placeholder="Usuario" required
                value={username} onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              {/* Input moderno oscuro */}
              <input 
                type="password" placeholder="Contraseña" required
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div>
            {/* Botón con degradado potente */}
            <button 
              type="submit" disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-bold rounded-lg text-white 
              bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all transform hover:scale-[1.02]
              ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Despertando servidor...' : 'Entrar al Sistema'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;