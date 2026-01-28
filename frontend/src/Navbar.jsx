import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 py-4 px-8 mb-8 sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {/* Logo / Nombre */}
        <Link to="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:scale-105 transition-transform">
          Kevin.Dev 💻
        </Link>

        {/* Enlaces de navegación */}
        <div className="flex gap-6">
          <Link to="/" className="text-gray-300 hover:text-white font-medium transition-colors">
            Portafolio
          </Link>
          <Link to="/blog" className="text-gray-300 hover:text-white font-medium transition-colors">
            Blog
          </Link>
          <Link to="/admin" className="px-4 py-2 bg-purple-900/50 border border-purple-500/30 rounded-lg text-purple-200 hover:bg-purple-800 transition-all text-sm font-bold">
            Admin 🔒
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
