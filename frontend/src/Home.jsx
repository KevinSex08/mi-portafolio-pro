import { useEffect, useState } from 'react'

function Home() {
  const [proyectos, setProyectos] = useState([])

  useEffect(() => {
    fetch('https://api-portafolio-kferazo.onrender.com/api/projects')
      .then(respuesta => respuesta.json())
      .then(datos => setProyectos(datos.reverse()))
      .catch(error => console.error("Error:", error))
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* Título de Bienvenida */}
      <div className="text-center mb-12 mt-8">
        <h1 className="text-5xl font-extrabold text-white mb-4">Bienvenido a mi Portafolio</h1>
        <p className="text-xl text-gray-400">Desarrollador Full Stack | MERN | Entusiasta Tech</p>
      </div>

      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-8 border-b border-gray-700 pb-2 inline-block">
        Mis Proyectos Recientes 💼
      </h2>

      {/* GRID DE PROYECTOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {proyectos.length === 0 && (
            <p className="text-gray-500 col-span-2 text-center py-10">Cargando proyectos...</p>
        )}

        {proyectos.map((proyecto) => (
          <div key={proyecto._id} className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700/50 hover:border-pink-500 transition-all hover:shadow-lg hover:shadow-purple-500/20 group flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">{proyecto.title}</h3>
              <p className="text-gray-400 mb-4 leading-relaxed line-clamp-3">{proyecto.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {Array.isArray(proyecto.technologies) ? proyecto.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-semibold text-purple-200 bg-purple-900/40 border border-purple-700/50 rounded-full">{tech}</span>
                )) : <span className="text-gray-500 text-sm">{proyecto.technologies}</span>}
              </div>
            </div>

            <a href={proyecto.linkRepo} target="_blank" rel="noopener noreferrer" className="inline-block text-center w-full py-2 rounded-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all transform hover:scale-[1.02]">
                Ver Código 🚀
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home