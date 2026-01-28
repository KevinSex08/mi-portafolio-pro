import { useState } from 'react'

function FormularioBlog() {
  const [titulo, setTitulo] = useState('')
  const [contenido, setContenido] = useState('')
  const [imagen, setImagen] = useState('')

  const manejarSubmit = async (e) => {
    e.preventDefault();
    
    const nuevoPost = { titulo, contenido, imagen };

    try {
        const respuesta = await fetch('https://api-portafolio-kferazo.onrender.com/api/posts', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            },
            body: JSON.stringify(nuevoPost)
        });

        if (respuesta.ok) {
            alert("¡Artículo publicado con éxito! ✍️");
            setTitulo('');
            setContenido('');
            setImagen('');
        } else {
            alert("Error al publicar.");
        }
    } catch (error) {
        console.error(error);
        alert("Error de conexión");
    }
  }

  return (
    <div className="w-full animate-fade-in-up">
      <h3 className="text-xl font-bold text-cyan-400 mb-6 border-b border-gray-700 pb-2">
        Escribir Nuevo Artículo 📰
      </h3>

      <form onSubmit={manejarSubmit} className="space-y-5">
        
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Título del Artículo</label>
          <input 
            type="text" 
            placeholder="Ej: ¿Por qué elegí MongoDB?"
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)} 
            required
            className="w-full bg-gray-900/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
          />
        </div>

        {/* Contenido */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Contenido (¡Escribe mucho!)</label>
          <textarea 
            placeholder="Empieza a escribir aquí..."
            value={contenido} 
            onChange={(e) => setContenido(e.target.value)} 
            required
            rows="10"
            className="w-full bg-gray-900/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none transition-all resize-none"
          />
          <p className="text-xs text-gray-500 mt-1 text-right">Recuerda: La rúbrica pide artículos detallados.</p>
        </div>

        {/* URL Imagen (Opcional) */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">URL de Imagen de Portada (Opcional)</label>
          <input 
            type="url" 
            placeholder="https://..."
            value={imagen} 
            onChange={(e) => setImagen(e.target.value)} 
            className="w-full bg-gray-900/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-3 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-lg shadow-lg transform transition hover:scale-[1.02] mt-4"
        >
          Publicar Post 🚀
        </button>

      </form>
    </div>
  )
}

export default FormularioBlog