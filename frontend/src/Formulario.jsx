import { useState } from 'react'

function Formulario({ alGuardar }) {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [tecnologias, setTecnologias] = useState('')
  const [linkRepo, setLinkRepo] = useState('')

  const manejarSubmit = async (e) => {
    e.preventDefault();
    
    // Convertimos el texto en un array para la base de datos
    const arrayTecnologias = tecnologias.split(',').map(tech => tech.trim());

    const nuevoProyecto = {
      title: titulo,
      description: descripcion,
      technologies: arrayTecnologias,
      linkRepo: linkRepo
    };

    try {
        const respuesta = await fetch('https://api-portafolio-kferazo.onrender.com/api/projects', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            },
            body: JSON.stringify(nuevoProyecto)
        });

        if (respuesta.ok) {
            alert("Proyecto guardado con éxito.");
            setTitulo('');
            setDescripcion('');
            setTecnologias('');
            setLinkRepo('');
            alGuardar(); // Actualiza la lista
        } else {
            alert("Error al guardar el proyecto.");
        }
    } catch (error) {
        console.error(error);
        alert("Error de conexión con el servidor.");
    }
  }

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
        Subir Nuevo Proyecto
      </h3>

      <form onSubmit={manejarSubmit} className="space-y-5">
        
        {/* Input Título */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Título del Proyecto</label>
          <input 
            type="text" 
            placeholder="Ej: E-commerce de Zapatillas"
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)} 
            required
            className="w-full bg-gray-900/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-600"
          />
        </div>

        {/* Input Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Descripción</label>
          <textarea 
            placeholder="Describe brevemente el proyecto..."
            value={descripcion} 
            onChange={(e) => setDescripcion(e.target.value)} 
            required
            rows="3"
            className="w-full bg-gray-900/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-600 resize-none"
          />
        </div>

        {/* Input Tecnologías */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Tecnologías (separadas por coma)</label>
          <input 
            type="text" 
            placeholder="React, Node.js, MongoDB..."
            value={tecnologias} 
            onChange={(e) => setTecnologias(e.target.value)} 
            required
            className="w-full bg-gray-900/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-600"
          />
        </div>

        {/* Input Link */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Link del Repositorio</label>
          <input 
            type="url" 
            placeholder="https://github.com/..."
            value={linkRepo} 
            onChange={(e) => setLinkRepo(e.target.value)} 
            required
            className="w-full bg-gray-900/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-600"
          />
        </div>

        {/* Botón Guardar */}
        <button 
          type="submit" 
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg shadow-lg transform transition hover:scale-[1.02] focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-4"
        >
          Guardar Proyecto
        </button>

      </form>
    </div>
  )
}

export default Formulario