// src/pages/Register.jsx 
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = 'https://refugiomascotas.onrender.com/api/auth' 

export default function Register({ theme: t }) {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    password: '',
    telefono: '',
    foto: null
  })
  const [preview, setPreview] = useState(null)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'nombre' || name === 'apellido') {
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) return
    }
    if (name === 'telefono') {
      if (!/^\d*$/.test(value)) return
    }
    setForm({ ...form, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setForm({ ...form, foto: file })
      setPreview(URL.createObjectURL(file))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!form.nombre.trim()) newErrors.nombre = 'Nombre obligatorio'
    if (!form.apellido.trim()) newErrors.apellido = 'Apellido obligatorio'
    if (form.password.length < 8) newErrors.password = 'Mínimo 8 caracteres'
    if (!/[A-Z]/.test(form.password)) newErrors.password = 'Debe tener 1 mayúscula'
    if (!form.telefono || form.telefono.length < 7) newErrors.telefono = 'Teléfono inválido'
    if (!form.foto) newErrors.foto = 'Sube una foto de perfil'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setSuccess('')
    setErrors({})

    const formData = new FormData()
    formData.append('nombre', `${form.nombre} ${form.apellido}`)
    formData.append('email', form.email || `${form.nombre.toLowerCase()}@ejemplo.com`) 
    formData.append('password', form.password)
    formData.append('telefono', form.telefono)
    formData.append('foto', form.foto)

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.msg || 'Error al crear cuenta')
      }

      // Guardar en localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      setSuccess('¡Cuenta creada con éxito! Redirigiendo...')
      setTimeout(() => navigate('/'), 2000)

    } catch (err) {
      setErrors({ general: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: t.bg, padding: '5rem 2rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '6rem', textAlign: 'center', background: t.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '2rem' }}>
          Crear Cuenta
        </h1>

        <div style={{ background: t.card, padding: '4rem', borderRadius: '50px', boxShadow: `0 40px 100px ${t.shadow}`, border: `4px solid ${t.border}60` }}>
          {errors.general && <div style={{ background: '#fee', color: '#c00', padding: '1.5rem', borderRadius: '20px', textAlign: 'center', marginBottom: '2rem', fontWeight: 'bold' }}>{errors.general}</div>}
          {success && <div style={{ background: '#e6f7ee', color: '#0c6', padding: '1.5rem', borderRadius: '20px', textAlign: 'center', marginBottom: '2rem', fontWeight: 'bold' }}>{success}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '2rem' }}>
            {/* FOTO DE PERFIL */}
            <div style={{ textAlign: 'center' }}>
              <label style={{ cursor: 'pointer' }}>
                <input type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} required />
                {preview ? (
                  <img src={preview} alt="Perfil" style={{ width: '160px', height: '160px', borderRadius: '50%', objectFit: 'cover', border: `6px solid ${t.accent}` }} />
                ) : (
                  <div style={{ width: '160px', height: '160px', borderRadius: '50%', background: t.primary + '40', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', color: t.primary }}>
                    User
                  </div>
                )}
                <p style={{ marginTop: '1rem', color: t.accent, fontWeight: 'bold' }}>Subir foto de perfil</p>
              </label>
              {errors.foto && <p style={{ color: '#ff3333', fontSize: '0.9rem' }}>{errors.foto}</p>}
            </div>

            <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required style={{ padding: '20px', borderRadius: '25px', border: `3px solid ${t.border}`, background: t.bg, color: t.text, fontSize: '1.3rem' }} />
            {errors.nombre && <p style={{ color: '#ff3333', fontSize: '0.9rem', marginTop: '-10px' }}>{errors.nombre}</p>}

            <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} required style={{ padding: '20px', borderRadius: '25px', border: `3px solid ${t.border}`, background: t.bg, color: t.text, fontSize: '1.3rem' }} />
            {errors.apellido && <p style={{ color: '#ff3333', fontSize: '0.9rem', marginTop: '-10px' }}>{errors.apellido}</p>}

            <input name="password" type="password" placeholder="Contraseña (8+ caracteres, 1 mayúscula)" value={form.password} onChange={handleChange} required style={{ padding: '20px', borderRadius: '25px', border: `3px solid ${t.border}`, background: t.bg, color: t.text, fontSize: '1.3rem' }} />
            {errors.password && <p style={{ color: '#ff3333', fontSize: '0.9rem', marginTop: '-10px' }}>{errors.password}</p>}

            <input name="telefono" placeholder="Teléfono (ej: 77022426)" value={form.telefono} onChange={handleChange} required style={{ padding: '20px', borderRadius: '25px', border: `3px solid ${t.border}`, background: t.bg, color: t.text, fontSize: '1.3rem' }} />
            {errors.telefono && <p style={{ color: '#ff3333', fontSize: '0.9rem', marginTop: '-10px' }}>{errors.telefono}</p>}

            <button 
              type="submit" 
              disabled={loading}
              style={{
                padding: '22px',
                background: loading ? '#999' : t.primary,
                color: 'white',
                border: 'none',
                borderRadius: '30px',
                fontSize: '1.8rem',
                fontWeight: '900',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: `0 20px 60px ${t.shadow}`,
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Creando cuenta...' : 'Crear mi cuenta'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', color: t.text + 'bb' }}>
            ¿Ya tienes cuenta? <a href="/login" style={{ color: t.accent, fontWeight: 'bold' }}>Iniciar sesión</a>
          </p>
        </div>
      </div>
    </div>
  )
}
