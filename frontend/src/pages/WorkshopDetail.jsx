import { useParams, Link } from "react-router-dom";

const workshops = [
  {
    id: 1,
    title: "Cómo cuidar a un cachorro correctamente",
    description: "Aprende rutinas, vacunas, alimentación, ejercicios y comportamiento ideal para cachorros.",
    longText: "En este taller aprenderás técnicas esenciales para criar un cachorro sano y feliz...",
    img: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=1200"
  },
  {
    id: 2,
    title: "Primeros auxilios para mascotas",
    description: "Qué hacer en emergencias para salvar la vida de un animal.",
    longText: "Cubrimos cortes, fracturas, intoxicaciones, golpes de calor, RCP y más...",
    img: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=1200"
  },
  {
    id: 3,
    title: "Cómo rescatar animales callejeros de forma segura",
    description: "Rescate responsable sin poner en riesgo a nadie.",
    longText: "Aprenderás protocolos de acercamiento, seguridad, manipulación y transporte...",
    img: "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=1200"
  }
];

export default function WorkshopDetail() {
  const { id } = useParams();
  const ws = workshops.find(w => w.id === Number(id));

  if (!ws) {
    return <div className="container"><h2>Charla no encontrada</h2></div>;
  }

  return (
    <div className="container">
      <Link to="/charlas-y-talleres" className="text-purple-700 font-bold">
        ← Volver
      </Link>

      <div style={{ marginTop: "2rem" }}>
        <img 
          src={ws.img} 
          alt={ws.title} 
          style={{ width: "100%", borderRadius: "16px", marginBottom: "2rem" }} 
        />

        <h1 style={{ fontSize: "2.5rem", color: "#4c1d95", marginBottom: "1rem" }}>
          {ws.title}
        </h1>

        <p style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>
          {ws.description}
        </p>

        <p style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
          {ws.longText}
        </p>

        <button 
          className="btn-primary" 
          style={{ marginTop: "2rem", padding: "14px 32px", fontSize: "1.1rem" }}
        >
          Inscribirme al taller
        </button>
      </div>
    </div>
  );
}
