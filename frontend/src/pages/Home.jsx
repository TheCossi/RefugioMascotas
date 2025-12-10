// src/pages/Home.jsx 
import { useState, useEffect } from 'react'

const slides = [
  { url: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=1920", subtitle: "Ellos ya te están esperando con la patita lista" },
  { url: "https://divertidosos.com.br/novidades/wp-content/uploads/2021/09/york5.jpg", subtitle: "Eso es lo que merecen y lo que tú puedes darles" },
  { url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1920", subtitle: "Hay miles de almas esperando por ti" },
  { url: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=1920", subtitle: "La suya... y la tuya para siempre" },
  { url: "https://tse1.mm.bing.net/th/id/OIP.mt3N3Q2K0Xj30EorMS80oQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3", subtitle: "Ven a conocerlo hoy mismo" }
]

export default function Home({ theme: t }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Overlay inteligente según el tema
  const overlayGradient = 
    t.name === 'Claro' 
      ? 'linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.85))'
      : t.name === 'Oscuro'
      ? 'linear-gradient(rgba(10,1,24,0.88), rgba(10,1,24,0.96))'
      : 'linear-gradient(rgba(0,17,34,0.92), rgba(0,17,34,0.98))'

  return (
    <>
      {/* SLIDER PRINCIPAL - TEXTO SIEMPRE VISIBLE */}
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        {slides.map((slide, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `${overlayGradient}, url(${slide.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentSlide === i ? 1 : 0,
              transition: 'opacity 2s ease-in-out',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            <div style={{ maxWidth: '1600px', padding: '2rem' }}>
              {/* SUBTÍTULO GIGANTE Y SIEMPRE LEGIBLE */}
              <h1 style={{
                fontSize: '9.5rem',
                fontWeight: '900',
                color: 'white',
                textShadow: `
                  0 4px 20px rgba(0,0,0,0.9),
                  0 8px 40px rgba(0,0,0,0.8),
                  0 0 60px rgba(0,0,0,0.7)
                `,
                letterSpacing: '-3px',
                lineHeight: '1.05',
                margin: '0',
                padding: '2rem 4rem',
                background: 'rgba(0,0,0,0.45)',
                borderRadius: '40px',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: `4px solid ${t.accent}40`,
                boxShadow: `0 0 80px ${t.accent}60, inset 0 0 60px rgba(0,0,0,0.4)`,
                display: 'inline-block'
              }}>
                {slide.subtitle}
              </h1>

              {/* LÍNEA ANIMADA DEBAJO */}
              <div style={{
                height: '12px',
                width: '700px',
                maxWidth: '90%',
                margin: '4rem auto 0',
                background: t.gradient,
                borderRadius: '50px',
                boxShadow: `0 0 80px ${t.accent}, 0 0 120px ${t.accent}80`,
                opacity: currentSlide === i ? 1 : 0,
                transition: 'all 2s ease'
              }}></div>
            </div>
          </div>
        ))}

        {/* INDICADORES INFERIORES */}
        <div style={{
          position: 'absolute',
          bottom: '70px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '24px',
          zIndex: 20
        }}>
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentSlide(i)}
              style={{
                width: currentSlide === i ? '110px' : '28px',
                height: '28px',
                borderRadius: '50px',
                background: currentSlide === i ? t.accent : 'rgba(255,255,255,0.3)',
                cursor: 'pointer',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: currentSlide === i 
                  ? `0 0 80px ${t.accent}, 0 0 120px ${t.accent}80` 
                  : '0 0 20px rgba(0,0,0,0.3)',
                transform: currentSlide === i ? 'scale(1.3)' : 'scale(1)'
              }}
            />
          ))}
        </div>
      </div>

      {/* SECCIÓN FINAL - TAMBIÉN CORREGIDA */}
      <div style={{
        padding: '16rem 3rem',
        background: t.card,
        textAlign: 'center',
        boxShadow: `0 -60px 140px ${t.shadow}`
      }}>
        <h2 style={{
          fontSize: '7.5rem',
          fontWeight: '900',
          background: t.gradient,
          WebkitBackgroundClip: 'text',
          marginBottom: '3rem',
          textShadow: '0 8px 40px rgba(0,0,0,0.4)'
        }}>
          Refugio Esperanza Animal
        </h2>
        <p style={{
          fontSize: '3.8rem',
          fontWeight: '800',
          color: t.primary,
          maxWidth: '1300px',
          margin: '0 auto',
          lineHeight: '1.3',
          textShadow: '0 6px 30px rgba(0,0,0,0.3)',
          background: 'rgba(0, 0, 0, 0.1)',
          padding: '2rem 4rem',
          borderRadius: '40px',
          backdropFilter: 'blur(10px)'
        }}>
          Aquí no solo encuentras una mascota...<br />
          encuentras un nuevo miembro de la familia que te cambiará la vida para siempre.
        </p>
      </div>
    </>
  )
}