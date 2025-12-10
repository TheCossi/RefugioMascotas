import { useState, useEffect } from 'react';

const petsInfo = {
  Perro: {
    img: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800&q=80',
    description: `El perro es un mamífero doméstico de la familia Canidae. Son animales leales, inteligentes y excelentes compañeros del ser humano.`
  },
  Gato: {
    img: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&q=80',
    description: `El gato es un felino doméstico muy popular como mascota. Son ágiles, curiosos, independientes y pueden formar un fuerte vínculo con su dueño.`
  },
  Conejo: {
    img: 'https://www.escuelapedia.com/wp-content/uploads/Conejo.jpg',
    description: `El conejo es un mamífero pequeño, herbívoro y sociable. Son mascotas tranquilas, les gusta mordisquear y requieren cuidados en su alimentación y higiene.`
  }
};

export default function Pets({ theme: t }) {
  // Cargar mascota activa desde localStorage o por defecto 'Perro'
  const [activePet, setActivePet] = useState(() => {
    return localStorage.getItem('activePet') || 'Perro';
  });

  // Guardar cada vez que cambia
  useEffect(() => {
    localStorage.setItem('activePet', activePet);
  }, [activePet]);

  return (
    <div style={{ minHeight: '100vh', background: t.bg }}>

      {/* BOTONES DE SELECCIÓN */}
      <div style={{
        padding: '2rem',
        background: t.card,
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        boxShadow: `0 10px 30px ${t.shadow}`
      }}>
        {Object.keys(petsInfo).map(pet => (
          <button
            key={pet}
            onClick={() => setActivePet(pet)}
            style={{
              padding: '12px 24px',
              borderRadius: '30px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              background: activePet === pet ? t.accent : t.card,
              color: activePet === pet ? 'white' : t.text,
              boxShadow: activePet === pet ? `0 10px 30px ${t.shadow}` : 'none',
              transition: 'all 0.3s ease'
            }}
          >
            {pet}
          </button>
        ))}
      </div>

      {/* INFORMACIÓN DE LA MASCOTA */}
      <div style={{
        maxWidth: '1000px',
        margin: '3rem auto',
        padding: '2rem',
        background: t.card,
        borderRadius: '20px',
        boxShadow: `0 10px 30px ${t.shadow}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '2rem'
      }}>
        <h2 id={activePet} style={{ color: t.primary, fontSize: '3rem' }}>{activePet}</h2>
        <img src={petsInfo[activePet].img} alt={activePet} style={{ width: '80%', maxWidth: '600px', borderRadius: '20px' }} />
        <p style={{ color: t.text, fontSize: '1.4rem', lineHeight: '1.6' }}>
          {petsInfo[activePet].description}
        </p>
      </div>
    </div>
  );
}
