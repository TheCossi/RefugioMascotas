// src/pages/Login.jsx 
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = 'https://refugiomascotas.onrender.com/api/auth'

export default function Login({ theme: t, setUser }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.msg || 'Error al iniciar sesión')

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      setUser(data.user)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: t.bg, padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '6rem', textAlign: 'center', background: t.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Iniciar Sesión
        </h1>

        <div style={{ background: t.card, padding: '4rem', borderRadius: '50px', boxShadow: `0 40px 100px ${t.shadow}`, marginTop: '3rem' }}>
          {error && <div style={{ background: '#fee', color: '#c00', padding: '1.5rem', borderRadius: '20px', textAlign: 'center' }}>{error}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '2rem', marginTop: '2rem' }}>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{ padding: '20px', borderRadius: '25px', border: `3px solid ${t.border}`, background: t.bg, color: t.text, fontSize: '1.4rem' }}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={{ padding: '20px', borderRadius: '25px', border: `3px solid ${t.border}`, background: t.bg, color: t.text, fontSize: '1.4rem' }}
            />

            <button type="submit" style={{
              padding: '22px',
              background: t.primary,
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              fontSize: '1.8rem',
              fontWeight: '900',
              cursor: 'pointer',
              boxShadow: `0 20px 60px ${t.shadow}`
            }}>
              Iniciar sesión
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', color: t.text + 'bb', fontSize: '1.3rem' }}>
            ¿No tienes cuenta? <a href="/register" style={{ color: t.accent, fontWeight: 'bold' }}>Regístrate aquí</a>
          </p>
        </div>
      </div>
    </div>
  )
}
