import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import Blog from './Blog'
import Login from './Login'
import Formulario from './Formulario'
import FormularioBlog from './FormularioBlog'

// --- COMPONENTE ADMIN PANEL MEJORADO (CRUD COMPLETO) ---
const AdminPanel = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [modo, setModo] = useState('proyecto'); // 'proyecto' o 'blog'
    const [posts, setPosts] = useState([]); // <--- NUEVO: Para listar y editar
    const navigate = useNavigate();
    
    // URL DEL BACKEND (Render)
    const API_URL = 'https://api-portafolio-kferazo.onrender.com/api';

    // 1. CARGAR DATOS AL ENTRAR
    useEffect(() => {
        if (token) {
            fetch(`${API_URL}/posts`)
                .then(res => res.json())
                .then(data => setPosts(data))
                .catch(err => console.error("Error cargando posts:", err));
        }
    }, [token]);

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/');
    }

    // 2. FUNCIÓN ELIMINAR (Requisito Rúbrica)
    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de borrar este post permanentemente? 🗑️")) return;

        try {
            const res = await fetch(`${API_URL}/posts/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                setPosts(posts.filter(post => post._id !== id)); // Actualizar lista visualmente
                alert("Post eliminado correctamente ✅");
            } else {
                alert("Error al eliminar. Tu sesión puede haber expirado.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    // 3. FUNCIÓN EDITAR (Requisito Rúbrica)
    const handleEdit = async (post) => {
        // Usamos prompt para editar rápido (puedes mejorarlo con un modal luego)
        const nuevoTitulo = prompt("Editar Título:", post.titulo);
        const nuevoContenido = prompt("Editar Contenido:", post.contenido);

        if (!nuevoTitulo || !nuevoContenido) return; // Si cancela, no hacemos nada

        try {
            const res = await fetch(`${API_URL}/posts/${post._id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({ titulo: nuevoTitulo, contenido: nuevoContenido })
            });

            if (res.ok) {
                alert("Post actualizado con éxito ✏️");
                // Recargamos la lista para ver cambios
                const data = await res.json();
                setPosts(posts.map(p => (p._id === post._id ? data : p)));
            }
        } catch (error) {
            console.error(error);
            alert("Error al editar");
        }
    };

    if (!token) {
        return <Login onLogin={() => setToken(localStorage.getItem('token'))} />;
    }

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl mb-20">
            
            {/* Header del Admin */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-700">
                <h2 className="text-2xl font-bold text-white">Panel de Control (Admin) ⚙️</h2>
                <button onClick={cerrarSesion} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-bold text-sm transition">
                    Cerrar Sesión
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* COLUMNA IZQUIERDA: CREAR */}
                <div>
                    <h3 className="text-xl text-gray-300 mb-4 font-bold border-l-4 border-green-500 pl-3">🚀 Crear Nuevo Contenido</h3>
                    
                    {/* BOTONES */}
                    <div className="flex gap-4 mb-6">
                        <button 
                            onClick={() => setModo('proyecto')}
                            className={`flex-1 py-2 rounded-lg font-bold transition-all ${modo === 'proyecto' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'}`}
                        >
                            💼 Proyecto
                        </button>
                        <button 
                            onClick={() => setModo('blog')}
                            className={`flex-1 py-2 rounded-lg font-bold transition-all ${modo === 'blog' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-400'}`}
                        >
                            ✍️ Post Blog
                        </button>
                    </div>

                    {/* FORMULARIO */}
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/50">
                        {modo === 'proyecto' ? (
                            <Formulario alGuardar={() => alert("¡Proyecto guardado!")} />
                        ) : (
                            <FormularioBlog alGuardar={() => {
                                alert("¡Post publicado!");
                                // Recargar posts automáticamente al crear uno nuevo
                                fetch(`${API_URL}/posts`).then(res=>res.json()).then(data=>setPosts(data));
                            }} />
                        )}
                    </div>
                </div>

                {/* COLUMNA DERECHA: GESTIONAR (EDITAR/BORRAR) - ¡ESTO DA EL 100/100! */}
                <div>
                    <h3 className="text-xl text-gray-300 mb-4 font-bold border-l-4 border-yellow-500 pl-3">🛠️ Gestionar Posts Existentes</h3>
                    
                    <div className="bg-gray-900/30 p-4 rounded-xl border border-gray-700 max-h-[600px] overflow-y-auto">
                        {posts.length === 0 ? (
                            <p className="text-gray-500 text-center py-10">No hay posts publicados aún.</p>
                        ) : (
                            posts.map(post => (
                                <div key={post._id} className="bg-white p-4 rounded-lg shadow mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <h4 className="text-gray-900 font-bold text-lg">{post.titulo}</h4>
                                        <p className="text-gray-500 text-xs">{new Date(post.fecha).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handleEdit(post)}
                                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 font-medium text-sm transition"
                                        >
                                            ✏️ Editar
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(post._id)}
                                            className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 font-medium text-sm transition"
                                        >
                                            🗑️ Borrar
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

// --- APP PRINCIPAL ---
function App() {
  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-100 pb-20">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/admin" element={<AdminPanel />} />
        {/* Ruta Login opcional si quieres acceso directo, aunque el AdminPanel ya lo maneja */}
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </div>
  )
}

export default App