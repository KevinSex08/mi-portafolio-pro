import { useEffect, useState } from 'react'

function Blog() {
  const [posts, setPosts] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    // 1. Pedimos los posts al servidor
    fetch('https://api-portafolio-kferazo.onrender.com/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        setCargando(false)
      })
      .catch(err => {
        console.error("Error cargando blog:", err)
        setCargando(false)
      })
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-8 text-center">
        Blog Técnico ✍️
      </h1>

      {cargando ? (
        <p className="text-center text-gray-400 animate-pulse">Cargando artículos...</p>
      ) : (
        <div className="space-y-8">
          {posts.length === 0 && (
            <div className="text-center p-10 bg-gray-800 rounded-xl border border-gray-700">
              <p className="text-xl text-gray-300">Aún no hay artículos publicados.</p>
              <p className="text-gray-500 mt-2">¡Ve al Admin para escribir el primero!</p>
            </div>
          )}

          {posts.map((post) => (
            <article key={post._id} className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden hover:border-cyan-500/50 transition-all shadow-lg hover:shadow-cyan-500/10">
              {/* Si hubiera imagen, iría aquí */}
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-cyan-400 bg-cyan-900/30 px-3 py-1 rounded-full border border-cyan-700/50">
                        Backend / Tech
                    </span>
                    <span className="text-sm text-gray-500">
                        {new Date(post.fecha).toLocaleDateString()}
                    </span>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-100 mb-4 hover:text-cyan-300 transition-colors cursor-pointer">
                    {post.titulo}
                </h2>
                
                <p className="text-gray-400 leading-relaxed mb-6 line-clamp-3">
                    {post.contenido}
                </p>

                <button className="text-sm font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-2">
                    Leer más <span className="text-lg">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default Blog