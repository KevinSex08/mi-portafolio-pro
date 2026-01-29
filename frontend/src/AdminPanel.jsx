import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token'); 
  const navigate = useNavigate();

  // Cargar posts
  useEffect(() => {
    // IMPORTANTE: Asegúrate de que esta URL sea la de TU backend
    fetch('https://api-portafolio-kferazo.onrender.com/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);

  // Borrar
  const handleDelete = async (id) => {
    if (!window.confirm("¿Borrar?")) return;
    const response = await fetch(`https://api-portafolio-kferazo.onrender.com/api/posts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (response.ok) {
        setPosts(posts.filter(p => p._id !== id));
    }
  };

  if (!token) return <div className="p-10 text-red-600">Acceso Denegado. Ve al Login.</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">Panel Admin</h1>
      <button onClick={() => navigate('/crear-post')} className="bg-green-500 text-white px-4 py-2 rounded mb-5">+ Crear Nuevo</button>
      
      {posts.map(post => (
        <div key={post._id} className="border p-4 mb-2 flex justify-between bg-white rounded shadow">
            <span>{post.titulo}</span>
            <button onClick={() => handleDelete(post._id)} className="text-red-500 font-bold">Eliminar 🗑️</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;