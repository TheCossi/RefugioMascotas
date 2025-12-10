// src/pages/Stories.jsx 
import { useState } from 'react'

const stories = [
  {
    name: "Rocky & Familia López",
    date: "Adoptado en marzo 2024",
    quote: "Llegó temblando y con miedo a todo… Hoy duerme en nuestra cama y nos despierta con besos. Salvó nuestra vida tanto como nosotros la suya.",
    imgBefore: "https://th.bing.com/th/id/R.969bafb004032e897aed45e6c1cdfb11?rik=DIW%2fLZlRuKC%2fYg&riu=http%3a%2f%2fanimalsbreeds.com%2fwp-content%2fuploads%2f2015%2f01%2fBulldog-6.jpg&ehk=ybOtI89zx9J6Y4UeDvDlgcpxkYbVh7WkZZ6DfIdOrh0%3d&risl=&pid=ImgRaw&r=0",
    imgAfter: "https://tse3.mm.bing.net/th/id/OIP.9BnZAjNPgHxl6B6kouo20gAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    petName: "Rocky",
    petType: "Perro mestizo"
  },
  {
    name: "Misha & Sofía",
    date: "Adoptada en diciembre 2024",
    quote: "Pensé que solo quería un gato… pero ella me eligió a mí. Ahora somos inseparables.",
    imgBefore: "https://tse1.explicit.bing.net/th/id/OIP.qE5y_tC3w3ZUOCTvfZXosAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    imgAfter: "https://smylepets.com/wp-content/uploads/2021/03/gato-rojo-raza-768x570.jpg",
    petName: "Misha",
    petType: "Gata naranja"
  },
  {
    name: "Tambor & Los niños Gómez",
    date: "Adoptado en julio 2025",
    quote: "Los niños aprendieron a ser responsables… y Tambor les enseñó lo que es el amor incondicional.",
    imgBefore: "https://tse1.mm.bing.net/th/id/OIP.NqbkiSUaGJ-QPLJq1vO7pQHaE6?rs=1&pid=ImgDetMain&o=7&rm=3",
    imgAfter: "https://t4.ftcdn.net/jpg/00/02/14/03/360_F_2140373_KAQnlrbiJ3Vk0xhIBQJ3eG86ZoYIXP.jpg",
    petName: "Tambor",
    petType: "Conejo holandés"
  },
  {
    name: "Lucky & Don José",
    date: "Adoptada en mayo 2025",
    quote: "A mis 78 años pensé que ya no tendría otro compañero… Luna me demostró que nunca es tarde para volver a amar.",
    imgBefore: "https://t1.uc.ltmcdn.com/es/posts/2/0/3/como_cuidar_a_un_yorkshire_terrier_40302_orig.jpg",
    imgAfter: "https://blog-static.petlove.com.br/wp-content/uploads/2021/08/Yorkshire-adulto-tamanho-Petlove.jpg",
    petName: "Lucky",
    petType: "Perro Yorkshire"
  }
]

export default function Stories({ theme: t }) {
  const [selected, setSelected] = useState(null)

  return (
    <div style={{ minHeight: '100vh', background: t.bg }}>
      {/* HERO CON TEXTO SIEMPRE LEGIBLE */}
      <div style={{
        height: '100vh',
        background: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url("https://cdn.pixabay.com/photo/2024/06/22/21/34/ai-generated-8847013_1280.jpg") center/cover no-repeat`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1400px', padding: '2rem' }}>
          <h1 style={{
            fontSize: '9.5rem',
            fontWeight: '900',
            background: t.gradient,
            WebkitBackgroundClip: 'text',
            marginBottom: '2rem',
            textShadow: '0 10px 40px rgba(0,0,0,0.8)'
          }}>
            Historias que Dejan Huella
          </h1>
          <p style={{
            fontSize: '3rem',
            color: 'white',
            opacity: 1,
            fontWeight: '600',
            textShadow: '0 4px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7)',
            letterSpacing: '1px'
          }}>
            Cada adopción escribe un nuevo comienzo lleno de amor
          </p>
        </div>
      </div>

      {/* GRID DE HISTORIAS */}
      <div style={{ padding: '10rem 2rem', maxWidth: '1700px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(440px, 1fr))', gap: '5rem' }}>
          {stories.map((story, i) => (
            <div key={i} onClick={() => setSelected(i)} style={{
              background: t.card,
              borderRadius: '50px',
              overflow: 'hidden',
              boxShadow: `0 40px 100px ${t.shadow}`,
              cursor: 'pointer',
              transition: 'all 0.5s ease',
              border: `4px solid ${t.border}60`
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-20px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', height: '360px' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <img src={story.imgBefore} alt="Antes" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(0,0,0,0.85)', color: 'white', padding: '12px 28px', borderRadius: '50px', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    ANTES
                  </div>
                </div>
                <div style={{ flex: 1, position: 'relative' }}>
                  <img src={story.imgAfter} alt="Después" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '20px', right: '20px', background: t.accent, color: 'white', padding: '12px 28px', borderRadius: '50px', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    HOY
                  </div>
                </div>
              </div>

              {/* CUADRO DE CITA AHORA 100% LEGIBLE */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                color: '#1a1a1a',
                margin: '-80px 40px 0',
                padding: '3rem 2.5rem',
                borderRadius: '40px',
                position: 'relative',
                textAlign: 'center',
                boxShadow: '0 25px 70px rgba(0,0,0,0.3)',
                border: `3px solid ${t.primary}40`,
                backdropFilter: 'blur(10px)'
              }}>
                <p style={{ 
                  fontSize: '1.65rem', 
                  fontStyle: 'italic', 
                  lineHeight: '2', 
                  fontWeight: '500',
                  color: '#222'
                }}>
                  “{story.quote}”
                </p>
              </div>

              <div style={{ padding: '5rem 2.5rem 2.5rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '2.8rem', color: t.primary, fontWeight: '900', marginBottom: '0.5rem' }}>
                  {story.name}
                </h3>
                <p style={{ color: t.accent, fontWeight: 'bold', fontSize: '1.3rem' }}>
                  {story.petName} • {story.petType}
                </p>
                <p style={{ color: t.text + 'aa', marginTop: '0.5rem', fontSize: '1.1rem' }}>
                  {story.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DETALLE */}
      {selected !== null && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.97)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '2rem' }} onClick={() => setSelected(null)}>
          <div style={{ background: t.card, borderRadius: '50px', maxWidth: '1100px', maxHeight: '95vh', overflow: 'auto', padding: '4rem', position: 'relative', boxShadow: `0 0 120px ${t.primary}40` }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} style={{
              position: 'absolute',
              top: '25px',
              right: '30px',
              background: '#dc2626',
              color: 'white',
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              border: 'none',
              fontSize: '3rem',
              cursor: 'pointer',
              zIndex: 10
            }}>×</button>

            <h2 style={{ fontSize: '5rem', color: t.primary, textAlign: 'center', marginBottom: '3rem', fontWeight: '900' }}>
              {stories[selected].name}
            </h2>

            <div style={{ display: 'flex', gap: '3rem', margin: '4rem 0' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <img src={stories[selected].imgBefore} alt="Antes" style={{ width: '100%', borderRadius: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }} />
                <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(0,0,0,0.8)', color: 'white', padding: '12px 30px', borderRadius: '50px', fontWeight: 'bold' }}>ANTES</div>
              </div>
              <div style={{ flex: 1, position: 'relative' }}>
                <img src={stories[selected].imgAfter} alt="Después" style={{ width: '100%', borderRadius: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }} />
                <div style={{ position: 'absolute', top: '20px', right: '20px', background: t.accent, color: 'white', padding: '12px 30px', borderRadius: '50px', fontWeight: 'bold' }}>HOY</div>
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              color: '#1a1a1a',
              padding: '3rem 4rem',
              borderRadius: '40px',
              margin: '3rem 0',
              textAlign: 'center',
              boxShadow: '0 25px 70px rgba(0,0,0,0.3)',
              border: `3px solid ${t.primary}40`
            }}>
              <p style={{ fontSize: '2.6rem', fontStyle: 'italic', lineHeight: '2.2', fontWeight: '500' }}>
                “{stories[selected].quote}”
              </p>
            </div>

            <p style={{ textAlign: 'center', color: t.accent, fontSize: '1.8rem', marginTop: '2rem', fontWeight: 'bold' }}>
              {stories[selected].petName} • {stories[selected].petType} • {stories[selected].date}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}