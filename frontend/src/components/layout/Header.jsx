// src/components/layout/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header({ theme: t }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (savedUser && isLoggedIn) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
    navigate("/");
  };

  const menuTextColor = t.name === "sun" ? "#222222" : t.text;
  const menuHoverColor = t.name === "sun" ? "#e27802" : t.primary;

  return (
    <header
      className="w-full shadow-2xl sticky top-0 z-50"
      style={{
        background: t.card,
        borderBottom: `4px solid ${t.primary}80`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <nav className="max-w-[1400px] mx-auto flex items-center justify-between p-6">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 text-3xl font-black transition-all hover:scale-105"
          style={{ color: t.primary }}
          onClick={() => setMenuOpen(false)}
        >
          <svg viewBox="0 0 24 24" width="50" height="50" fill={t.accent}>
            <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
          </svg>
          <span className="hidden sm:inline">Refugio Esperanza Animal</span>
          <span className="sm:hidden">Refugio</span>
        </Link>

        {/* BOTÓN MENÚ MÓVIL */}
        <button
          className="md:hidden text-5xl font-bold z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: t.primary }}
        >
          {menuOpen ? "×" : "≡"}
        </button>

        {/* MENÚ PRINCIPAL */}
        <ul
          className={`
            flex-col absolute top-full left-0 w-full p-8 gap-6 shadow-2xl
            md:static md:flex md:flex-row md:p-0 md:gap-10 lg:gap-14 md:shadow-none
            font-bold text-lg items-center transition-all duration-300
            ${menuOpen ? "flex" : "hidden md:flex"}
          `}
          style={{
            background: menuOpen,
            borderTop: menuOpen ? `4px solid ${t.primary}` : "none",
            color: menuTextColor, 
          }}
        >

          {[
            ["Inicio", "/"],
            ["Adopta", "/adopta"],
            ["Veterinarias", "/veterinarias-aliadas"],
            ["Charlas", "/charlas-y-talleres"],
            ["Mascotas", "/mascotas"],
            ["Historias", "/historias"],
            ["Contacto", "/contacto"],
          ].map(([label, path]) => (
            <li key={path}>
              <Link
                to={path}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: menuTextColor,
                }}
                className="transition"
                onMouseEnter={(e) => (e.target.style.color = menuHoverColor)}
                onMouseLeave={(e) => (e.target.style.color = menuTextColor)}
              >
                {label}
              </Link>
            </li>
          ))}

          {/* LOGIN / USUARIO */}
          <li className="mt-6 md:mt-0">
            {user ? (
              <div className="flex items-center gap-4 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border-2 border-white/30">

                {user.foto ? (
                  <img
                    src={user.foto}
                    alt="Perfil"
                    className="w-12 h-12 rounded-full object-cover border-4 border-white shadow-xl"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center text-white font-black text-xl shadow-xl">
                    {user.nombreCompleto.charAt(0)}
                  </div>
                )}

                <div className="hidden md:block text-left">
                  <p className="text-sm opacity-80">Bienvenido</p>
                  <p className="font-black text-lg" style={{ color: t.accent }}>
                    {user.nombreCompleto.split(" ")[0]}
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="ml-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-bold text-sm transition-all shadow-xl"
                >
                  Salir
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="px-8 py-4 rounded-full font-bold text-white shadow-2xl transition-all hover:scale-105"
                  style={{ background: t.primary }}
                >
                  Iniciar Sesión
                </Link>
                
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="px-8 py-4 rounded-full font-bold border-4 transition-all hover:scale-105 shadow-2xl"
                  style={{ borderColor: t.accent, color: t.accent }}
                >
                  Registrarse
                </Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
