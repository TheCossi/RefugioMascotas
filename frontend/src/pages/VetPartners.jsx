// src/pages/VetPartners.jsx 
import { useState } from 'react'

const WHATSAPP_NUMBER = "59177022426"

const vets = [
  {
    name: "Clínica Veterinaria Natural Vet",
    address: "Calle 8 # 2285, Av. Beni, Santa Cruz de la Sierra",
    phone: "+591 3 341 79 83",
    services: "Emergencias 24h • Cirugías • Vacunas • Rayos X",
    rating: 4.9,
    img: "https://tse2.mm.bing.net/th/id/OIP.OvgBeisJUeRPAazRBuod2AHaHT?rs=1&pid=ImgDetMain&o=7&rm=3",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.987!2d-63.185!3d-17.783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f1e7e5f3b0a5e7%3A0x9e6b8f7d5f8e9a2c!2sCl%C3%ADnica%20Veterinaria%20Natural%20Vet!5e0!3m2!1ses!2sbo!4v1735780000000"
  },
  {
    name: "Clínica Veterinaria San Mateo",
    address: "Av. Prefecto Rivas # 411, Santa Cruz de la Sierra",
    phone: "+591 3 347 77 77",
    services: "Peluquería • Consultas • Desparasitaciones • Esterilizaciones",
    rating: 5.0,
    img: "https://cdn.bio.link/uploads/profile_pictures/2023-05-14/PlHPSCTxLH4IS0xymANse61JOkw6bRz5.png",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.987!2d-63.175!3d-17.775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f1e7e5f3b0a5e7%3A0x294974767589663!2sCl%C3%ADnica%20Veterinaria%20San%20Mateo!5e0!3m2!1ses!2sbo!4v1735780000000"
  },
  {
    name: "Clínica Veterinaria Pedigree",
    address: "Av. Radial 13 # 3330, Santa Cruz de la Sierra",
    phone: "+591 3 350 72 70",
    services: "Especialistas • Internación • Laboratorio • Cirugías 24h",
    rating: 4.8,
    img: "https://tse4.mm.bing.net/th/id/OIP.Lqq9A8PbxTRdsYChuFAlLgHaGm?rs=1&pid=ImgDetMain&o=7&rm=3",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.987!2d-63.165!3d-17.770!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f1e7e5f3b0a5e7%3A0x165617070610223!2sCl%C3%ADnica%20Veterinaria%20Pedigree!5e0!3m2!1ses!2sbo!4v1735780000000"
  },
  {
    name: "Veterinaria Sudamericana",
    address: "Av. El Trompillo 1013, Santa Cruz de la Sierra",
    phone: "+591 3 352 41 83",
    services: "Urgencias • Ecografías • Fisioterapia • Odontología",
    rating: 4.7,
    img: "https://cladera.org/canvas/images/imagemodelo/canvas-89.jpg",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.987!2d-63.155!3d-17.765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f1e7e5f3b0a5e7%3A0xabcdef1234567890!2sVeterinaria%20Sudamericana!5e0!3m2!1ses!2sbo!4v1735780000000"
  }
]

export default function VetPartners({ theme: t }) {
  const [selectedVet, setSelectedVet] = useState(null)

  const openWhatsAppVet = (vet) => {
    const msg = encodeURIComponent(
      `¡Hola Refugio Esperanza Animal!\n\nQuiero coordinar un turno en:\n*${vet.name}*\nDirección: ${vet.address}\nTel: ${vet.phone}\n\nGracias!`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
  }

  const openWhatsAppChequeoGratis = () => {
    const msg = encodeURIComponent(
      "¡Hola Refugio Esperanza!\n\nAcabo de adoptar a mi peludito y quiero aprovechar el *CHEQUEO GRATIS del primer mes*.\n\n¿Cómo coordinamos?\n¡Gracias!"
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
  }

  const openWhatsAppAliado = () => {
    const msg = encodeURIComponent(
      "¡Hola Refugio Esperanza Animal!\n\nSoy médico veterinario y me encantaría ser parte de sus clínicas aliadas.\n\nQuiero saber cómo puedo colaborar.\n¡Gracias!"
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
  }

  return (
    <div style={{ minHeight: '100vh', background: t.bg }}>
      {/* HERO */}
      <div style={{
        height: '100vh',
        background: `linear-gradient(rgba(0,0,0,0.88), rgba(0,0,0,0.96)), url("https://th.bing.com/th/id/R.5e1a09e56a454fab2fa2a8d682c17d15?rik=E3tBzwU5ZYx1JQ&riu=http%3a%2f%2fparquesalegres.org%2fwp-content%2fuploads%2f2016%2f10%2fpokaz_obrazek-1024x768.jpg&ehk=S5ofegm5jtqypWoe%2ftAURj%2fy%2bb07VxEm7a4hsHfKaz8%3d&risl=&pid=ImgRaw&r=0") center/cover no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1400px', padding: '2rem' }}>
          <h1 style={{
            fontSize: '9.5rem',
            fontWeight: '900',
            background: t.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 10px 50px rgba(0,0,0,0.9)'
          }}>
            Veterinarias Aliadas
          </h1>
          <p style={{
            fontSize: '3.2rem',
            color: 'white',
            maxWidth: '1100px',
            margin: '3rem auto',
            textShadow: '0 4px 20px rgba(0,0,0,0.9)'
          }}>
            Nuestros socios de confianza que cuidan a tus peludos con amor y excelencia
          </p>

          <button onClick={openWhatsAppChequeoGratis} style={{
            background: t.accent,
            color: 'white',
            padding: '2rem 5rem',
            borderRadius: '70px',
            fontSize: '2.2rem',
            fontWeight: '900',
            cursor: 'pointer',
            boxShadow: `0 20px 60px ${t.shadow}, 0 0 80px ${t.accent}80`,
            animation: 'pulse 3s infinite'
          }}>
            Chequeo GRATIS el primer mes para adoptados
          </button>
        </div>
      </div>

      {/* GRID DE VETERINARIAS */}
      <div style={{ padding: '8rem 2rem', maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '5rem' }}>
          {vets.map((vet, i) => (
            <div key={i} style={{
              background: t.card,
              borderRadius: '44px',
              overflow: 'hidden',
              boxShadow: `0 35px 100px ${t.shadow}`,
              border: `4px solid ${t.border}60`
            }}>
              <img src={vet.img} alt={vet.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />

              <div style={{ padding: '3rem' }}>
                <h3 style={{ fontSize: '2.6rem', color: t.primary, fontWeight: '900' }}>{vet.name}</h3>
                <p style={{ color: t.text + 'bb', margin: '1rem 0' }}><strong>Dirección:</strong> {vet.address}</p>
                <p style={{ color: t.accent, fontWeight: 'bold', fontSize: '1.6rem' }}>{vet.phone}</p>
                <p style={{ color: t.text + 'aa', marginTop: '1rem' }}><strong>Servicios:</strong> {vet.services}</p>

                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2.5rem' }}>
                  <button onClick={() => setSelectedVet(vet)} style={{
                    flex: 1, padding: '18px', background: t.primary, color: 'white', borderRadius: '20px', fontWeight: '900', fontSize: '1.4rem'
                  }}>
                    Ver en mapa
                  </button>
                  <button onClick={() => openWhatsAppVet(vet)} style={{
                    flex: 1, padding: '18px', background: '#25D366', color: 'white', borderRadius: '20px', fontWeight: '900', fontSize: '1.4rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                  }}>
                    WhatsApp Contactar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL MAPA - CORREGIDO EL PARÉNTESIS */}
      {selectedVet && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }} onClick={() => setSelectedVet(null)}>
          <div style={{ background: t.card, borderRadius: '44px', maxWidth: '1000px', width: '95%', maxHeight: '90vh', overflow: 'hidden', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedVet(null)} style={{
              position: 'absolute', top: '25px', right: '30px', background: '#dc2626', color: 'white', width: '70px', height: '70px', borderRadius: '50%', border: 'none', fontSize: '3rem'
            }}>×</button>
            <div style={{ padding: '3rem', textAlign: 'center' }}>
              <h2 style={{ fontSize: '4rem', color: t.primary, fontWeight: '900' }}>{selectedVet.name}</h2>
              <p style={{ color: t.text + 'cc', fontSize: '1.8rem' }}>{selectedVet.address}</p>
            </div>
            <iframe src={selectedVet.map} width="100%" height="560" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>
      )}

      {/* BANNER FINAL */}
      <div style={{ background: t.primary, color: 'white', textAlign: 'center', padding: '8rem 2rem' }}>
        <h2 style={{ fontSize: '4.5rem', marginBottom: '2rem', fontWeight: '900' }}>
          ¿Querés ser veterinaria aliada?
        </h2>
        <p style={{ fontSize: '2rem', maxWidth: '900px', margin: '0 auto 3rem' }}>
          Unite a nuestra red y ayudanos a salvar más vidas juntos
        </p>
        <button onClick={openWhatsAppAliado} style={{
          background: '#25D366', padding: '24px 80px', borderRadius: '70px', fontSize: '2rem', fontWeight: '900',
          border: 'none', cursor: 'pointer', boxShadow: '0 25px 70px rgba(37,211,102,0.6)'
        }}>
          WhatsApp ¡Quiero ser aliado!
        </button>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}