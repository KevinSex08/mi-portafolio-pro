import { useEffect, useState } from 'react'
import Login from './Login'
import Formulario from './Formulario'

function App() {
  const [proyectos, setProyectos] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token')); 

  const cargarProyectos = () => {
    fetch('https://api-portafolio-kferazo.onrender.com/api/projects')
      .then(respuesta => respuesta.json())
      .then(datos => setProyectos(datos.reverse()))
      .catch(error => console.error("Error:", error))
  }

  useEffect(() => {
    cargarProyectos()
  }, [])

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    setToken(null);
  }

  return (
    <div className="min-h-screen p-8 max-w-5xl mx-auto font-sans">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Mis Proyectos
        </h1>
        
        {token && (
          <button 
            onClick={cerrarSesion} 
            className="px-4 py-2 text-sm font-bold text-red-400 bg-red-900/20 border border-red-500/50 rounded-lg hover:bg-red-900/40 transition-all"
          >
            Cerrar Sesión
          </button>
        )}
      </div>

      {/* LOGIN O FORMULARIO */}
      <div className="mb-12">
        {!token ? (
          <Login onLogin={() => setToken(localStorage.getItem('token'))} />
        ) : (
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
            <Formulario alGuardar={cargarProyectos} />
          </div>
        )}
      </div>

      <hr className="border-gray-700 my-10" />

      {/* LISTA DE PROYECTOS (GRID 2 COLUMNAS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {proyectos.length === 0 && (
          <p className="text-gray-500 col-span-2 text-center">No hay proyectos para mostrar aún.</p>
        )}

        {proyectos.map((proyecto) => (
          <div 
            key={proyecto._id} 
            className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700/50 hover:border-pink-500 transition-all hover:shadow-lg hover:shadow-purple-500/20 group flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                {proyecto.title}
              </h2>
              
              <p className="text-gray-400 mb-4 leading-relaxed">
                {proyecto.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {Array.isArray(proyecto.technologies) ? (
                   proyecto.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-semibold text-purple-200 bg-purple-900/40 border border-purple-700/50 rounded-full">
                      {tech}
                    </span>
                   ))
                ) : (
                  <span className="text-gray-500 text-sm">{proyecto.technologies}</span>
                )}
              </div>
            </div>

            <a 
              href={proyecto.linkRepo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-center w-full py-2 rounded-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all transform hover:scale-[1.02]"
            >
              Ver Código
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App