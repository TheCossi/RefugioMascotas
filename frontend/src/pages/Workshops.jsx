// src/pages/Workshops.jsx
import { useState, useEffect } from 'react';

const events = [
  { id: 1, type: "Perro", breed: "Todas", title: "Taller de Primeros Auxilios Caninos", date: "15 AGO", time: "10:00 - 13:00", speaker: "Dra. Laura Méndez", spots: 8, img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=1200&q=90" },
  { id: 2, type: "Gato", breed: "Todas", title: "Comportamiento Felino: Entendiendo a tu gato", date: "22 AGO", time: "18:30 - 20:30", speaker: "MVZ. Carlos Rivera", spots: 12, img: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=1200&q=90" },
  { id: 3, type: "Perro", breed: "Golden Retriever", title: "Entrenamiento Positivo para Goldens", date: "05 SEP", time: "09:00 - 12:00", speaker: "Entrenador Pablo Ortiz", spots: 5, img:  "https://cdn.britannica.com/65/102265-050-EC17E3B0/retriever-puppies.jpg" },
  { id: 4, type: "Perro", breed: "Bulldog", title: "Cuidado Especial del Bulldog Francés", date: "12 SEP", time: "11:00 - 13:00", speaker: "Dra. Sofía Vargas", spots: 15, img: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=1200&q=90" },
  { id: 5, type: "Gato", breed: "Persa", title: "Cuidados del gato Persa: Pelo y salud", date: "19 SEP", time: "17:00 - 19:00", speaker: "MVZ. Ana Torres", spots: 10, img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&q=90" },
  { id: 6, type: "Perro", breed: "Todas", title: "Nutrición Natural para Perros", date: "26 SEP", time: "10:00 - 13:30", speaker: "Nutrióloga Canina Valeria Ruiz", spots: 3, img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=90" },
  { id: 7, type: "Perro", breed: "Pastor Alemán", title: "Adiestramiento Avanzado Pastor Alemán", date: "03 OCT", time: "08:00 - 12:00", speaker: "Adiestrador Jefe Marco Díaz", spots: 6, img: "https://tse3.mm.bing.net/th/id/OIP.QKopX3h3FK8arF0h4rLWrAHaE7?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 8, type: "Conejo", breed: "Todas", title: "Cuidado especial del Conejo", date: "10 OCT", time: "18:00 - 20:00", speaker: "Etóloga Felina Camila Soto", spots: 20, img: "https://www.escuelapedia.com/wp-content/uploads/Conejo.jpg" }
];

export default function Workshops({ theme: t }) {
  const [filterType, setFilterType] = useState("Todos");
  const [filterBreed, setFilterBreed] = useState("Todas");
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('reservations')) || [];
    setReservations(saved);
  }, []);

  const filtered = events.map(event => {
    const reservedCount = reservations.filter(r => r.workshopId === event.id).length;
    return { ...event, spots: event.spots - reservedCount };
  }).filter(e =>
    (filterType === "Todos" || e.type === filterType) &&
    (filterBreed === "Todas" || e.breed === filterBreed)
  );

  const types = ["Todos", "Perro", "Gato", "Conejo"];
  const breeds = ["Todas", "Golden Retriever", "Bulldog", "Persa", "Pastor Alemán"];

  const handleReserve = (event) => {
    if (reservations.length >= 3) {
      alert('No puedes reservar más de 3 talleres');
      return;
    }
    if (event.spots <= 0) {
      alert('No hay cupos disponibles en este taller');
      return;
    }

    const newReservation = {
      name: 'Invitado',
      workshopId: event.id,
      workshopTitle: event.title,
      date: event.date
    };

    const updated = [...reservations, newReservation];
    setReservations(updated);
    localStorage.setItem('reservations', JSON.stringify(updated));

    alert('Reserva realizada con éxito');
  };

  const handleCancelReservation = (workshopId) => {
    const updated = reservations.filter(r => r.workshopId !== workshopId);
    setReservations(updated);
    localStorage.setItem('reservations', JSON.stringify(updated));
    alert('Reserva cancelada');
  };

  const whatsappLink = (reservation) => {
    const text = `Hola, quiero comunicarme con el refugio sobre la reserva:\n- ${reservation.workshopTitle} - ${reservation.date}`;
    return `https://wa.me/59177022426?text=${encodeURIComponent(text)}`; // tu número de WhatsApp
  };

  return (
    <div style={{ minHeight: '100vh', background: t.bg }}>
      {/* HEADER */}
      <div style={{
        position: 'relative',
        height: '60vh',
        background: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url("https://img.freepik.com/fotos-premium/fondo-perros_953680-312.jpg?w=2000") center/cover no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{ fontSize: '6rem', fontWeight: '900', marginBottom: '1rem' }}>Charlas y Talleres</h1>
        <p style={{ fontSize: '2rem', maxWidth: '900px' }}>Aprendé con los mejores especialistas y convertite en el compañero ideal de tu peludo</p>
      </div>

      {/* FILTROS */}
      <div style={{
        padding: '2rem',
        background: t.card,
        marginTop: '-50px',
        borderRadius: '40px 40px 0 0',
        boxShadow: `0 -20px 60px ${t.shadow}`,
        position: 'relative',
        zIndex: 10,
        textAlign: 'center'
      }}>
        {types.map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            style={{
              margin: '0 0.5rem',
              padding: '10px 20px',
              borderRadius: '50px',
              border: 'none',
              background: filterType === type ? t.accent : t.card,
              color: filterType === type ? 'white' : t.text,
              cursor: 'pointer'
            }}
          >
            {type}
          </button>
        ))}
        <select
          value={filterBreed}
          onChange={(e) => setFilterBreed(e.target.value)}
          style={{ marginLeft: '1rem', padding: '10px 15px', borderRadius: '20px', border: `2px solid ${t.accent}`, cursor: 'pointer' }}
        >
          {breeds.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      {/* GRID DE TALLERES */}
      <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
        {filtered.map(event => (
          <div key={event.id} style={{ background: t.card, borderRadius: '20px', padding: '1.5rem', boxShadow: `0 10px 30px ${t.shadow}` }}>
            <img src={event.img} alt={event.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '15px' }} />
            <h3 style={{ marginTop: '1rem', color: t.primary }}>{event.title}</h3>
            <p>{event.type} • {event.breed}</p>
            <p>Hora: {event.time}</p>
            <p>Cupos disponibles: {event.spots}</p>
            <button
              onClick={() => handleReserve(event)}
              disabled={event.spots <= 0}
              style={{ marginTop: '1rem', width: '100%', padding: '12px', borderRadius: '15px', border: 'none', background: event.spots <= 0 ? '#999' : t.accent, color: 'white', cursor: event.spots <= 0 ? 'not-allowed' : 'pointer' }}
            >
              {event.spots <= 0 ? 'Sin cupos' : 'Reservar'}
            </button>
          </div>
        ))}
      </div>

      {/* RESERVAS HECHAS */}
      <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem', background: t.card, borderRadius: '20px', boxShadow: `0 10px 30px ${t.shadow}` }}>
        <h3 style={{ color: t.primary, marginBottom: '1rem' }}>Mis reservas ({reservations.length}/3)</h3>
        {reservations.length === 0 ? <p>No has reservado ningún taller aún.</p> :
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {reservations.map((r, idx) => (
              <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', background: '#f0fdf4', padding: '0.6rem 1rem', borderRadius: '10px' }}>
                <span>{r.workshopTitle} - <strong>{r.date}</strong></span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <a href={whatsappLink(r)} target="_blank" rel="noopener noreferrer" style={{ background: '#25D366', color: 'white', padding: '6px 12px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>
                  <button onClick={() => handleCancelReservation(r.workshopId)} style={{ background: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', padding: '6px 12px', fontWeight: 'bold', cursor: 'pointer' }}>Cancelar</button>
                </div>
              </li>
            ))}
          </ul>
        }
      </div>
    </div>
  );
}
