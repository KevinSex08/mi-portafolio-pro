import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import Blog from './Blog'
import Login from './Login'
import Formulario from './Formulario'
import FormularioBlog from './FormularioBlog' // <--- IMPORTANTE: Importamos el nuevo form

// --- COMPONENTE ADMIN PANEL MEJORADO ---
const AdminPanel = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [modo, setModo] = useState('proyecto'); // 'proyecto' o 'blog'
    
    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setToken(null);
    }

    if (!token) {
        return <Login onLogin={() => setToken(localStorage.getItem('token'))} />;
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl">
            
            {/* Header del Admin */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-700">
                <h2 className="text-2xl font-bold text-white">Panel de Control ⚙️</h2>
                <button onClick={cerrarSesion} className="text-red-400 hover:text-red-300 font-bold text-sm">
                    Cerrar Sesión
                </button>
            </div>

            {/* BOTONES PARA ELEGIR QUÉ CREAR */}
            <div className="flex gap-4 mb-8">
                <button 
                    onClick={() => setModo('proyecto')}
                    className={`flex-1 py-3 rounded-lg font-bold transition-all ${modo === 'proyecto' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
                >
                    💼 Nuevo Proyecto
                </button>
                <button 
                    onClick={() => setModo('blog')}
                    className={`flex-1 py-3 rounded-lg font-bold transition-all ${modo === 'blog' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
                >
                    ✍️ Nuevo Post
                </button>
            </div>

            {/* Renderizado condicional: Mostramos uno u otro formulario */}
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/50">
                {modo === 'proyecto' ? (
                    <Formulario alGuardar={() => alert("¡Proyecto guardado! Ve al Inicio para verlo.")} />
                ) : (
                    <FormularioBlog />
                )}
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
      </Routes>
    </div>
  )
}

export default App