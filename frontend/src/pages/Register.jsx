// src/pages/Register.jsx 
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
      const reader = new FileReader()
      reader.onloadend = () => {
        setForm({ ...form, foto: reader.result })
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!form.nombre.trim()) newErrors.nombre = 'Nombre obligatorio'
    if (!form.apellido.trim()) newErrors.apellido = 'Apellido obligatorio'
    if (form.password.length < 8) newErrors.password = 'Mínimo 8 caracteres'
    if (!/[A-Z]/.test(form.password)) newErrors.password = 'Debe tener 1 mayúscula'
    if (!form.telefono || form.telefono.length < 7) newErrors.telefono = 'Teléfono inválido'
    if (!form.foto) newErrors.foto = 'Sube una foto'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const user = {
      nombreCompleto: `${form.nombre} ${form.apellido}`,
      password: form.password,
      telefono: form.telefono,
      foto: form.foto,
      fechaRegistro: new Date().toISOString()
    }

    localStorage.setItem('user', JSON.stringify(user))
    setSuccess('¡Cuenta creada con éxito! Iniciando sesión...')
    setTimeout(() => navigate('/'), 1500)
  }

  return (
    <div style={{ minHeight: '100vh', background: t.bg, padding: '5rem 2rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '6rem', textAlign: 'center', background: t.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '2rem' }}>
          Crear Cuenta
        </h1>

        <div style={{ background: t.card, padding: '4rem', borderRadius: '50px', boxShadow: `0 40px 100px ${t.shadow}`, border: `4px solid ${t.border}60` }}>
          {success && <div style={{ background: '#e6f7ee', color: '#0c6', padding: '1.5rem', borderRadius: '20px', textAlign: 'center', marginBottom: '2rem', fontWeight: 'bold' }}>{success}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <label style={{ cursor: 'pointer' }}>
                <input type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
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
              Crear mi cuenta
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