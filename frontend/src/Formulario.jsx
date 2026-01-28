import { useState } from 'react';

function Formulario({ alGuardar }) {
  const [datos, setDatos] = useState({
    title: '',
    description: '',
    linkRepo: '',
    technologies: '' // Lo pediremos como texto separado por comas
  });

const enviarFormulario = async (e) => {
    e.preventDefault();
    const tecnologiasArray = datos.technologies.split(',').map(t => t.trim());

    // RECUPERAMOS EL TOKEN DEL BOLSILLO
    const token = localStorage.getItem('token');

    const respuesta = await fetch('https://api-portafolio-kferazo.onrender.com/api/projects', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': token // <--- ¡AQUÍ MOSTRAMOS LA PULSERA!
      },
      body: JSON.stringify({ ...datos, technologies: tecnologiasArray })
    });

    if (respuesta.ok) {
      alert("¡Proyecto guardado con éxito! 🎉");
      setDatos({ title: '', description: '', linkRepo: '', technologies: '' });
      alGuardar();
    } else {
      alert("Hubo un error (Posiblemente el token venció, vuelve a loguearte)");
    }
  };

  return (
    <form onSubmit={enviarFormulario} style={{ marginBottom: '30px', border: '2px dashed #ccc', padding: '20px' }}>
      <h3>Subir Nuevo Proyecto</h3>
      <input 
        type="text" placeholder="Título del proyecto" required 
        value={datos.title} 
        onChange={(e) => setDatos({...datos, title: e.target.value})}
        style={{ display: 'block', margin: '10px 0', width: '100%' }}
      />
      <textarea 
        placeholder="Descripción" required
        value={datos.description}
        onChange={(e) => setDatos({...datos, description: e.target.value})}
        style={{ display: 'block', margin: '10px 0', width: '100%' }}
      />
      <input 
        type="text" placeholder="Tecnologías (separadas por coma: React, Node...)" required
        value={datos.technologies}
        onChange={(e) => setDatos({...datos, technologies: e.target.value})}
        style={{ display: 'block', margin: '10px 0', width: '100%' }}
      />
      <input 
        type="text" placeholder="Link de GitHub (Copia y pega tu link real)" required
        value={datos.linkRepo}
        onChange={(e) => setDatos({...datos, linkRepo: e.target.value})}
        style={{ display: 'block', margin: '10px 0', width: '100%' }}
      />
      <button type="submit" style={{ background: 'blue', color: 'white', padding: '10px' }}>
        Guardar Proyecto
      </button>
    </form>
  );
}

export default Formulario;