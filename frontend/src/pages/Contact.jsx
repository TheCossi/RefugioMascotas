// src/pages/Contact.jsx 
import { useState } from 'react'
import favicon from '../assets/favicon.png'

const WHATSAPP_NUMBER = "59177022426"

export default function Contact({ theme }) {
  const [form, setForm] = useState({
    nombre: '', email: '', telefono: '', mensaje: ''
  })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  // === CHAT DE LUNA ===
  const [chatMessages, setChatMessages] = useState([
    { text: "¡Hola! Soy Luna, tu asistente del Refugio Esperanza Animal", isBot: true },
    { text: "¿En qué te puedo ayudar hoy?", isBot: true }
  ])

  const quickQuestions = [
    { q: "¿Cómo puedo adoptar un perrito o gatito?", a: "¡Qué lindo! Entrá a la sección ADOPTAR, elegí al peludito que te robó el corazón y llená el formulario. ¡Nosotros te acompañamos en todo el proceso!" },
    { q: "¿Dónde están ubicados?", a: "Estamos en Calle 8 # 2285, Av. Beni, Santa Cruz de la Sierra. ¡Te mandamos la ubicación exacta por WhatsApp cuando quieras venir!" },
    { q: "¿Puedo donar comida, mantas o juguetes?", a: "¡SÍ, por favor! Aceptamos alimento, mantas limpias, correas, juguetes, todo ayuda. ¡Gracias por tu gran corazón!" },
    { q: "¿Los animales están vacunados y desparasitados?", a: "¡Todos nuestros peluditos salen vacunados, desparasitados y esterilizados (si tienen edad). ¡Salud garantizada!" },
    { q: "¿Tienen clínica veterinaria propia?", a: "Trabajamos con clínicas aliadas que dan chequeo GRATIS el primer mes + descuentos especiales para adoptados" },
    { q: "¿Hacen talleres o charlas educativas?", a: "¡Sí! Todos los meses tenemos charlas gratuitas sobre tenencia responsable, primeros auxilios y más. ¡Pronto publicamos fechas!" },
    { q: "¿Puedo apadrinar a un animalito?", a: "¡Claro! Con solo 50 Bs al mes cubrís comida y cuidados de un peludito mientras espera su hogar. ¡Escribinos y te contamos todo!" },
    { q: "¿Puedo ser voluntario?", a: "¡Te estábamos esperando! Necesitamos paseadores, fotógrafos, community managers y manos solidarias. ¡Mandanos mensaje!" },
    { q: "¿Aceptan tarjetas o transferencias para donar?", a: "¡Sí! Tenemos QR Tigo Money, transferencia bancaria y pronto PayPal. ¡Tu ayuda llega directo a los peluditos!" },
    { q: "¿Cuánto cuesta adoptar?", a: "La adopción es GRATUITA. Solo pedimos compromiso y amor de por vida" },
    { q: "¿Puedo adoptar si vivo en otra ciudad?", a: "¡Sí! Ayudamos con transporte seguro a Cochabamba, Santa Cruz y Tarija. ¡El amor no tiene fronteras!" },
    { q: "¿Tienen animales senior o con discapacidad?", a: "¡Sí! Y son los que más necesitan amor. Los abuelitos y los de patita rota tienen descuento especial en apadrinamiento" },
    { q: "¿Hacen seguimiento post-adopción?", a: "¡Siempre! Te visitamos, te llamamos y estamos para vos las 24 hs. ¡Tu nuevo integrante nunca estará solo!" },
    { q: "¿Puedo llevar a mi perro a conocerlos?", a: "¡Claro! Traélo con correa y vacunado. Hacemos prueba de sociabilidad para que se hagan amigos" },
    { q: "¡Solo quiero ayudar!", a: "¡Eso ya es muchísimo! Compartí nuestras publicaciones, etiquetanos en redes o simplemente mandanos buena onda. ¡Todo suma!" }
  ]

  const sendQuickQuestion = (item) => {
    setChatMessages(prev => [...prev, { text: item.q, isBot: false }])
    setTimeout(() => {
      setChatMessages(prev => [...prev, { text: item.a, isBot: true }])
    }, 900)
  }

  // === FORMULARIO ===
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio'
    if (!form.email.includes('@')) newErrors.email = 'Email inválido'
    if (!/^\d{8}$/.test(form.telefono)) newErrors.telefono = 'Debe tener exactamente 8 números'
    if (form.mensaje.trim().length < 10) newErrors.mensaje = 'Mínimo 10 caracteres'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const sendToWhatsApp = () => {
    if (!validate()) return
    const text = encodeURIComponent(`
¡Hola Refugio Esperanza Animal!

Soy *${form.nombre}*
Tel: ${form.telefono}
Email: ${form.email}

Mensaje:
${form.mensaje}

¡Gracias por todo lo que hacen!
    `.trim())
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank')
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <div style={{ minHeight: '100vh', padding: '5rem 2rem', background: theme.bg }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h1 style={{ fontSize: '5.5rem', fontWeight: '900', background: theme.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ¡Contáctanos!
          </h1>
          <p style={{ fontSize: '2rem', color: theme.text + 'cc' }}>
            Te respondemos en minutos por WhatsApp
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
          {/* FORMULARIO */}
          <div style={{ background: theme.card, padding: '3.5rem', borderRadius: '40px', boxShadow: `0 30px 80px ${theme.shadow}`, border: `4px solid ${theme.border}60` }}>
            <h2 style={{ fontSize: '2.8rem', color: theme.primary, marginBottom: '2rem', textAlign: 'center' }}>
              Enviá tu mensaje
            </h2>

            {sent && (
              <div style={{ background: '#d4edda', color: '#155724', padding: '1rem', borderRadius: '16px', textAlign: 'center', marginBottom: '1.5rem', fontWeight: 'bold' }}>
                ¡Abriendo WhatsApp... tu mensaje está listo!
              </div>
            )}

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div>
                <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre *" style={inputStyle(theme)} />
                {errors.nombre && <p style={errorStyle}>{errors.nombre}</p>}
              </div>
              <div>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Tu email *" style={inputStyle(theme)} />
                {errors.email && <p style={errorStyle}>{errors.email}</p>}
              </div>
              <div>
                <input
                  name="telefono"
                  value={form.telefono}
                  onChange={(e) => /^\d*$/.test(e.target.value) && e.target.value.length <= 8 && handleChange(e)}
                  placeholder="Teléfono (8 números) *"
                  style={inputStyle(theme)}
                  maxLength={8}
                />
                {errors.telefono && <p style={errorStyle}>{errors.telefono}</p>}
              </div>
              <div>
                <textarea name="mensaje" value={form.mensaje} onChange={handleChange} rows="6" placeholder="Tu mensaje (mín. 10 caracteres) *" style={{...inputStyle(theme), resize: 'vertical'}} />
                {errors.mensaje && <p style={errorStyle}>{errors.mensaje}</p>}
                <p style={{ fontSize: '0.9rem', color: theme.text + '88', textAlign: 'right' }}>
                  {form.mensaje.length}/10 caracteres
                </p>
              </div>

              <button onClick={sendToWhatsApp} style={{
                padding: '20px',
                background: '#25D366',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                fontSize: '1.6rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 20px 50px rgba(37,211,102,0.5)'
              }}>
                Enviar por WhatsApp
              </button>
            </div>
          </div>

          {/* LUNA + CHAT - AHORA SIEMPRE VISIBLE Y HERMOSO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* FOTO DE LUNA */}
            <div style={{ background: theme.card, padding: '3rem', borderRadius: '40px', textAlign: 'center', boxShadow: `0 25px 70px ${theme.shadow}`, border: `4px solid ${theme.primary}60` }}>
              <img 
                src={favicon} 
                alt="Luna" 
                style={{ 
                  width: '180px', 
                  height: '180px', 
                  borderRadius: '50%', 
                  objectFit: 'cover', 
                  marginBottom: '1.5rem',
                  border: `8px solid ${theme.accent}`,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
                }} 
              />
              <h3 style={{ fontSize: '3rem', color: theme.accent, margin: '0.5rem 0', fontWeight: '900' }}>
                Luna
              </h3>
              <p style={{ color: theme.text + 'dd', fontSize: '1.5rem', fontWeight: '600' }}>
                Asistente del Refugio
              </p>
            </div>

            {/* CHAT DE LUNA */}
            <div style={{ 
              background: 'linear-gradient(135deg, #1a0033, #2d004d)', 
              borderRadius: '40px', 
              boxShadow: `0 30px 100px ${theme.shadow}`, 
              overflow: 'hidden',
              border: `4px solid ${theme.primary}80`
            }}>
              {/* Mensajes */}
              <div style={{ height: '500px', padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {chatMessages.map((msg, i) => (
                  <div key={i} style={{
                    alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                    maxWidth: '85%'
                  }}>
                    <div style={{
                      background: msg.isBot ? 'rgba(198,132,255,0.25)' : theme.accent,
                      color: msg.isBot ? '#e0c3fc' : 'white',
                      padding: '1.2rem 1.8rem',
                      borderRadius: '24px',
                      borderBottomLeftRadius: msg.isBot ? '4px' : '24px',
                      borderBottomRightRadius: msg.isBot ? '24px' : '4px',
                      backdropFilter: 'blur(10px)',
                      border: msg.isBot ? '1px solid rgba(198,132,255,0.4)' : 'none',
                      boxShadow: msg.isBot ? 'none' : `0 15px 40px ${theme.shadow}`
                    }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Preguntas frecuentes */}
              <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.3)', borderTop: `3px solid ${theme.primary}60` }}>
                <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: theme.accent, marginBottom: '1.5rem', textAlign: 'center' }}>
                  Preguntas frecuentes:
                </p>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {quickQuestions.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => sendQuickQuestion(item)}
                      style={{
                        textAlign: 'left',
                        padding: '1.2rem 1.6rem',
                        background: 'rgba(198,132,255,0.15)',
                        color: '#e0c3fc',
                        border: `2px solid rgba(198,132,255,0.4)`,
                        borderRadius: '20px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        backdropFilter: 'blur(10px)'
                      }}
                      onMouseEnter={e => {
                        e.target.style.background = 'rgba(198,132,255,0.3)'
                        e.target.style.transform = 'translateX(8px)'
                      }}
                      onMouseLeave={e => {
                        e.target.style.background = 'rgba(198,132,255,0.15)'
                        e.target.style.transform = 'translateX(0)'
                      }}
                    >
                      {item.q}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* WhatsApp directo */}
            <div style={{ background: '#25D366', color: 'white', padding: '2.5rem', borderRadius: '32px', textAlign: 'center', boxShadow: '0 25px 70px rgba(37,211,102,0.5)' }}>
              <p style={{ fontSize: '1.8rem', margin: '0 0 1rem 0', fontWeight: 'bold' }}>¡Escribinos directo!</p>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                style={{ color: 'white', fontSize: '2.8rem', fontWeight: '900', textDecoration: 'none' }}>
                77022426
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const inputStyle = (theme) => ({
  padding: '18px 22px',
  borderRadius: '20px',
  border: `3px solid ${theme.border}`,
  background: theme.card,
  color: theme.text,
  fontSize: '1.2rem',
  outline: 'none',
  width: '100%',
  transition: 'all 0.3s'
})

const errorStyle = { 
  color: '#ff3333', 
  fontSize: '0.95rem', 
  margin: '0.5rem 0 0 8px', 
  fontWeight: 'bold' 
}