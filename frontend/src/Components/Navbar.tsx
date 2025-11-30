import { useState } from "react";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[#121212] border-b border-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LOGO CON ANIMACIÓN */}
        <div className="w-full h-[70px] bg-[#111] border-b border-gray-800 flex items-center justify-center">
      <h1 className="text-2xl font-extrabold text-white tracking-wider brand-animate">
        KhipuPredict
      </h1>
    </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-gray-300 font-medium">
        </div>

        {/* BOTÓN MOBILE */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* MENÚ MOBILE */}
      {menuOpen && (
        <div className="md:hidden bg-[#1a1a1a] border-t border-gray-700 px-6 py-4 space-y-3 text-gray-300">
          <button className="block w-full text-left hover:text-white">
            Inicio
          </button>
          <button className="block w-full text-left hover:text-white">
            Acerca
          </button>
          <button className="block w-full text-left hover:text-white">
            Contactos
          </button>
        </div>
      )}
    </nav>
  );
};
