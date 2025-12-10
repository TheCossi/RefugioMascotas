// src/pages/Adopt.jsx
import { useState, useEffect } from "react";

const WHATSAPP_NUMBER = "59177022426";

const pets = [
  // -------- PERROS --------
  { name: "Max", age: "2 años", type: "Perro", breed: "Salchicha", img: "https://perro-salchicha.com/wp-content/uploads/2020/03/foto-cachorro-dachshund-tekel-perro-salchicha-013.jpg" },
  { name: "Rocky", age: "3 años", type: "Perro", breed: "Golden Retriever", img: "https://ik.imagekit.io/yynn3ntzglc/cms/209_contenu2_5fa45f22ba_9XEC7xj3K.jpg" },
  { name: "Coco", age: "2 años", type: "Perro", breed: "Labrador", img: "https://tse3.mm.bing.net/th/id/OIP.Wm1CMVNoybrduTmzwRjuOwHaFJ" },
  { name: "Zeus", age: "4 años", type: "Perro", breed: "Pastor Alemán", img: "https://www.tiendanimal.es/articulos/wp-content/uploads/2017/11/Como-educar-y-entrenar-a-un-pastor-aleman-1200x900.jpg" },
  { name: "Bobby", age: "1 año", type: "Perro", breed: "Beagle", img: "https://wakyma.com/blog/wp-content/uploads/2016/12/que-caracteristicas-tienen-los-perros-de-la-raza-beagle.jpg" },
  { name: "Bruno", age: "5 años", type: "Perro", breed: "Yorkshire", img: "https://th.bing.com/th/id/R.28a9b8d2851b64f1ed18a3af74f3a6ae?rik=H%2fOz9PGcnjs%2f6g&riu=http%3a%2f%2fwww.dog-learn.com%2fdog-breeds%2fyorkshire-terrier%2fimages%2fyorkshire-terrier-u2.jpg&ehk=whcP6TwtWBAIH0MbS1fhdbQROMBt8PGVHZogeTPdT%2b0%3d&risl=&pid=ImgRaw&r=0" },
  { name: "Nala", age: "3 años", type: "Perro", breed: "Border Collie", img: "https://www.dailypaws.com/thmb/DrdDMUtzZthOeStdAjBRU7odWgk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/border-collie-pup-walking-688060557-2000-e000bca5c7f14399a9bf1ef18f032dd7.jpg" },
  { name: "Toby", age: "2 años", type: "Perro", breed: "Shih Tzu", img: "https://www.ilmiocaneleggenda.it/wp-content/uploads/2021/10/shih-tzu-3-640x427.jpg" },

  // -------- GATOS --------
  { name: "Luna", age: "3 años", type: "Gato", breed: "Siamés", img: "https://medjimurje.hr/upload/publish/11760/thumb/macka_57889d1d54188_1468571079138_630x390c.jpg" },
  { name: "Misha", age: "3 años", type: "Gato", breed: "Persa", img: "https://www.bubblypet.com/wp-content/uploads/2022/07/White-Persian-cat-walking-on-green-grass-1080x720.jpg" },
  { name: "Kira", age: "2 años", type: "Gato", breed: "Atigrado", img: "https://gatos.plus/wp-content/uploads/2020/05/bebe-siames-pelo-largo.jpg" },
  { name: "Tom", age: "5 años", type: "Gato", breed: "Negro", img: "https://tse2.mm.bing.net/th/id/OIP.D_l-fUsNCs-4X1Odq6D4jAHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { name: "Milo", age: "1 año", type: "Gato", breed: "Europeo", img: "https://img.freepik.com/fotos-premium/retrato-agradable-gato-blanco-gris-ojos-verdes-sentado-al-aire-libre-mirando-arriba-luz-borrosa-soleado_127089-2835.jpg" },
  { name: "Nieve", age: "3 años", type: "Gato", breed: "Blanco", img: "https://tse3.mm.bing.net/th/id/OIP.VuLXIqEZF-SziYTUYvP9NAHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" },

  // -------- CONEJOS --------
  { name: "Tambor", age: "1 años", type: "Conejo", breed: "Holandés", img: "https://misanimales.com/wp-content/uploads/2015/01/conejo.jpg" },
  { name: "Snow", age: "2 año", type: "Conejo", breed: "Enano", img: "https://tse3.mm.bing.net/th/id/OIP.bWW7WGT7bRkYTqs2oOSCVAHaGq?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { name: "Chispa", age: "2 años", type: "Conejo", breed: "Toy", img: "https://www.ukpets.com/blog/wp-content/uploads/2018/05/netherland-dwarf-rabbit.jpg" },
  { name: "Pompón", age: "1 años", type: "Conejo", breed: "Cabeza de León", img: "https://animales.me/wp-content/uploads/2020/04/Conejo-cabeza-de-le%C3%B3n-bebe-blanco-1024x659.jpg" },
];

export default function Adopt({ theme: t }) {
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [modalPet, setModalPet] = useState(null);

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(fav);
  }, []);

  // ----------- FAVORITOS -----------
  const toggleFavorite = (petName) => {
    let updatedFavorites = [...favorites];
    if (updatedFavorites.includes(petName)) {
      updatedFavorites = updatedFavorites.filter((item) => item !== petName);
    } else {
      updatedFavorites.push(petName);
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const filteredPets = pets
    .filter(p => filter === "Todos" ? true : p.type === filter)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const favoritePets = pets.filter((p) => favorites.includes(p.name));

  // ----------- MODAL ADOPCIÓN -----------
  const handleAdoptClick = (pet) => setModalPet(pet);

  const confirmAdopt = () => {
    const message = encodeURIComponent(
      `¡Hola Refugio Esperanza Animal! Quiero adoptar a *${modalPet.name}* (${modalPet.age}, ${modalPet.breed}).`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    setModalPet(null);
  };

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text }}>

      {/* MODAL */}
      {modalPet && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ background: t.card, color: t.text }}>
            <h2>¡Confirmar adopción!</h2>
            <p>¿Quieres adoptar a <strong>{modalPet.name}</strong> ({modalPet.age}, {modalPet.breed})?</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "2rem" }}>
              <button onClick={confirmAdopt} style={{ padding: "15px 40px", borderRadius: "20px", background: t.primary, color: "white" }}>Sí, adoptar</button>
              <button onClick={() => setModalPet(null)} style={{ padding: "15px 40px", borderRadius: "20px", background: t.accent, color: "white" }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* BOTÓN FAVORITOS */}
      <div style={{ padding: "3rem 2rem", textAlign: "center" }}>
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          style={{
            padding: "18px 50px",
            borderRadius: "70px",
            background: showFavorites ? t.primary : t.card,
            color: showFavorites ? "white" : t.text,
            fontSize: "1.8rem",
            fontWeight: "bold",
            cursor: "pointer",
            border: `4px solid ${t.border}90`,
            marginBottom: "2rem",
          }}
        >
          {showFavorites ? "Ver todas las mascotas" : "⭐ Ver mis favoritos"}
        </button>
      </div>

      {/* HERO */}
      {!showFavorites && (
        <div
          style={{
            position: "relative",
            height: "100vh",
            backgroundImage: `url("https://www.elcolombiano.com/documents/10157/0/484x370/0c66/483d304/none/11101/EKXM/image_content_25157354_20160118224455.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.85))",
            }}
          ></div>
          <div
            style={{
              position: "relative",
              zIndex: 10,
              maxWidth: "1100px",
              padding: "2rem",
            }}
          >
            <h1
              style={{
                fontSize: "7.5rem",
                fontWeight: "900",
                background: t.gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "2rem",
              }}
            >
              Encuentra a tu compañero perfecto
            </h1>
            <p
              style={{
                fontSize: "2.8rem",
                color: "white",
                fontWeight: "600",
                maxWidth: "900px",
                margin: "0 auto",
              }}
            >
              Todos nuestros animales están vacunados y listos para un hogar lleno de amor.
            </p>
          </div>
        </div>
      )}

      {/* FILTROS Y BUSCADOR */}
      {!showFavorites && (
        <div
          style={{
            padding: "5rem 2rem",
            background: t.card,
            marginTop: "-100px",
            borderRadius: "60px 60px 0 0",
            textAlign: "center",
          }}
        >
          <br />
          <br />
          <br />
          <input
            type="text"
            placeholder="Buscar mascota..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "15px 30px",
              fontSize: "1.6rem",
              borderRadius: "30px",
              border: `3px solid ${t.border}`,
              marginBottom: "3rem",
              width: "90%",
              maxWidth: "400px",
            }}
          />
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "4rem" }}>
            {["Todos", "Perro", "Gato", "Conejo"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                style={{
                  padding: "18px 50px",
                  borderRadius: "70px",
                  background: filter === type ? t.accent : t.card,
                  color: filter === type ? "white" : t.text,
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  border: `4px solid ${filter === type ? "transparent" : t.border}90`,
                }}
              >
                {type === "Todos" ? "Todas las mascotas" : type + "s"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* GRID MASCOTAS */}
      <div style={{ padding: "8rem 2rem", maxWidth: "1700px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "5rem",
          }}
        >
          {(showFavorites ? favoritePets : filteredPets).map((pet, i) => (
            <div
              key={i}
              className="card-mascota animate-fade-slide"
              style={{
                background: t.card,
                borderRadius: "50px",
                overflow: "hidden",
                border: `5px solid ${t.border}70`,
                position: "relative",
              }}
            >
              {/* FAVORITO */}
              <div
                onClick={() => toggleFavorite(pet.name)}
                style={{
                  position: "absolute",
                  top: "25px",
                  right: "25px",
                  fontSize: "3rem",
                  cursor: "pointer",
                  color: favorites.includes(pet.name) ? "yellow" : "white",
                  textShadow: "0 0 10px black",
                }}
              >
                ★
              </div>
              <div style={{ height: "380px", overflow: "hidden" }}>
                <img src={pet.img} alt={pet.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "3.5rem" }}>
                <h3 style={{ fontSize: "3.2rem", color: t.primary, fontWeight: "900" }}>{pet.name}</h3>
                <p style={{ fontSize: "1.8rem", color: t.accent, fontWeight: "bold" }}>
                  {pet.age} • {pet.breed}
                </p>
                <button
                  onClick={() => handleAdoptClick(pet)}
                  style={{
                    width: "100%",
                    padding: "22px",
                    background: t.primary,
                    color: "white",
                    borderRadius: "25px",
                    fontSize: "1.8rem",
                    fontWeight: "900",
                    cursor: "pointer",
                    marginTop: "1rem",
                  }}
                >
                  Quiero adoptar a {pet.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SIN FAVORITOS */}
        {showFavorites && favoritePets.length === 0 && (
          <p style={{ fontSize: "2.2rem", textAlign: "center", marginTop: "5rem", color: t.text }}>
            Aún no tienes mascotas en favoritos 
          </p>
        )}
      </div>
    </div>
  );
}
