// src/App.jsx 
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'

import Home from './pages/Home'
import Adopt from './pages/Adopt'
import VetPartners from './pages/VetPartners'
import Workshops from './pages/Workshops'
import WorkshopDetail from './pages/WorkshopDetail'
import Stories from './pages/Stories'
import Contact from './pages/Contact'
import Pets from './pages/Pets'

import Register from './pages/Register'
import Login from './pages/Login'

function App() {
  const [user, setUser] = useState(null)

  // Cargar usuario
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    if (savedUser && isLoggedIn) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  // Tema guardado / cargado
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('refugio-theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    localStorage.setItem('refugio-theme', theme)
  }, [theme])

  // Cambiar tema
  const toggleTheme = () => {
    setTheme(prev =>
      prev === 'light'
        ? 'dark'
        : prev === 'dark'
        ? 'daltonico'
        : 'light'
    )
  }

  // Paletas de temas
  const themes = {
    light: {
      name: 'Claro',
      bg: '#fdf8f5',
      card: '#ffffff',
      text: '#2d1b3d',
      primary: '#6b46c1',
      accent: '#ee8c2b',
      border: '#e8dffe',
      shadow: 'rgba(107,70,193,0.15)',
      gradient: 'linear-gradient(135deg, #9f7aea, #ee8c2b)',
      buttonGlow: '0 0 30px rgba(107,70,193,0.4)'
    },
    dark: {
      name: 'Oscuro',
      bg: '#0a0118',
      card: '#1a0033',
      text: '#e0c3fc',
      primary: '#c684ff',
      accent: '#ff6b35',
      border: '#6b46c1',
      shadow: 'rgba(198,132,255,0.4)',
      gradient: 'linear-gradient(135deg, #9f7aea, #ff6b35)',
      buttonGlow: '0 0 40px #c684ff, 0 0 80px #ff6b35'
    },
    daltonico: {
      name: 'Daltónico',
      bg: '#001122',
      card: '#002233',
      text: '#00ffff',
      primary: '#00ffff',
      accent: '#ff00aa',
      border: '#00ffff',
      shadow: 'rgba(0,255,255,0.5)',
      gradient: 'linear-gradient(135deg, #00ffff, #ff00aa)',
      buttonGlow: '0 0 50px #00ffff, 0 0 100px #ff00aa, 0 0 150px #ff00aa'
    }
  }

  const t = themes[theme]

  return (
    <div
      style={{
        minHeight: '100vh',
        background: t.bg,
        color: t.text,
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: '"Poppins", sans-serif'
      }}
    >

      {/* BOTÓN FLOTANTE CAMBIO DE TEMA */}
      <button
        onClick={toggleTheme}
        aria-label={`Tema: ${t.name}`}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: t.gradient,
          color: 'white',
          border: '4px solid white',
          boxShadow: t.buttonGlow,
          cursor: 'pointer',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          animation: 'pulse 3s infinite',
          transition: 'all 0.6s ease'
        }}
      >
        {theme === 'light' && 'Sun'}
        {theme === 'dark' && 'Moon'}
        {theme === 'daltonico' && 'Circle'}
      </button>

      {/* ANIMACIÓN CSS */}
      <style jsx>{`
        @keyframes pulse {
          0% { box-shadow: ${t.buttonGlow}; }
          50% {
            box-shadow: ${t.buttonGlow};
            transform: scale(1.1);
          }
          100% { box-shadow: ${t.buttonGlow}; }
        }
        * { scrollbar-color: ${t.primary} ${t.bg}; }
      `}</style>

      {/* RUTAS ACTUALIZADAS CON LOGIN Y REGISTER */}
      <Routes>
        {/* Rutas que usan el Layout (header + footer) */}
        <Route element={<Layout theme={t} user={user} setUser={setUser} />}>
          <Route path="/" element={<Home theme={t} />} />
          <Route path="/adopta" element={<Adopt theme={t} />} />
          <Route path="/veterinarias-aliadas" element={<VetPartners theme={t} />} />
          <Route path="/charlas-y-talleres" element={<Workshops theme={t} />} />
          <Route path="/charlas-y-talleres/:id" element={<WorkshopDetail theme={t} />} />
          <Route path="/historias" element={<Stories theme={t} />} />
          <Route path="/contacto" element={<Contact theme={t} />} />
          <Route path="/mascotas" element={<Pets theme={t} />} />
        </Route>

        {/* Rutas SIN Layout (pantallas completas de login/register) */}
        <Route path="/register" element={<Register theme={t} />} />
        <Route path="/login" element={<Login theme={t} setUser={setUser} />} />
      </Routes>
    </div>
  )
}

export default App