// src/components/sections/WorkshopsSection.jsx
import WorkshopCard from './WorkshopCard'

const workshops = [
  { month: "AGO", day: "15", title: "Taller de Primeros Auxilios para Mascotas", desc: "Aprende a responder en emergencias." },
  { month: "SEP", day: "05", title: "Charla sobre Comportamiento Canino", desc: "Entiende mejor a tu mejor amigo." }
]

export default function WorkshopsSection({ showAll = false }) {
  const items = showAll ? workshops : workshops

  return (
    <section className="mb-12">
      <h2 className="text-[#181411] dark:text-background-light text-[22px] font-bold leading-tight tracking-[-0.015em] px-0 pb-3 pt-5">
        Charlas y Talleres
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-3">
        {items.map((w, i) => <WorkshopCard key={i} {...w} />)}
      </div>
    </section>
  )
}