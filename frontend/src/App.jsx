import { useEffect, useState } from 'react'
import Login from './Login'
import Formulario from './Formulario'

function App() {
  const [proyectos, setProyectos] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token')); // ¿Tenemos pulsera guardada?

  const cargarProyectos = () => {
    fetch('https://api-portafolio-kferazo.onrender.com/api/projects')
      .then(respuesta => respuesta.json())
      .then(datos => setProyectos(datos.reverse()))
      .catch(error => console.error("Error:", error))
  }

  useEffect(() => {
    cargarProyectos()
  }, [])

  // Función para cerrar sesión (borrar token)
  const cerrarSesion = () => {
    localStorage.removeItem('token');
    setToken(null);
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Mis Proyectos 💼</h1>
        {token && (
          <button onClick={cerrarSesion} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
            Salir
          </button>
        )}
      </div>

      {/* LÓGICA DE PANTALLAS: */}
      {/* Si NO hay token -> Muestra Login */}
      {/* Si SI hay token -> Muestra Formulario */}
      
      {!token ? (
        <Login onLogin={() => setToken(localStorage.getItem('token'))} />
      ) : (
        <Formulario alGuardar={cargarProyectos} />
      )}

      <hr />

      {/* La lista de proyectos la ve todo el mundo, con o sin token */}
      <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
        {proyectos.map((proyecto) => (
          <div key={proyecto._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 10px 0' }}>{proyecto.title}</h2>
            <p>{proyecto.description}</p>
            <p><strong>Tecnologías:</strong> {proyecto.technologies.join(', ')}</p>
            <a href={proyecto.linkRepo} target="_blank" style={{ color: 'blue', fontWeight: 'bold' }}>
              Ver Código
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App