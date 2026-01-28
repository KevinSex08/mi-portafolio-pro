import { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const manejarSubmit = async (e) => {
    e.preventDefault();
    
    // Pedimos permiso al servidor
    const respuesta = await fetch('https://api-portafolio-kferazo.onrender.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await respuesta.json();

    if (respuesta.ok) {
      // SI ES EXITOSO: Guardamos la "pulsera" en el bolsillo del navegador
      localStorage.setItem('token', data.token);
      onLogin(); // Avisamos a la App que ya entramos
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', maxWidth: '300px', margin: '50px auto' }}>
      <h2>Iniciar Sesión 🔐</h2>
      <form onSubmit={manejarSubmit}>
        <input 
          type="text" placeholder="Usuario" 
          value={username} onChange={(e) => setUsername(e.target.value)}
          style={{ display: 'block', width: '90%', margin: '10px 0', padding: '8px' }}
        />
        <input 
          type="password" placeholder="Contraseña" 
          value={password} onChange={(e) => setPassword(e.target.value)}
          style={{ display: 'block', width: '90%', margin: '10px 0', padding: '8px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px', background: 'black', color: 'white' }}>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;