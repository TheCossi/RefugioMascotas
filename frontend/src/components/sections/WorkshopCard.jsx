// src/components/sections/WorkshopCard.jsx
export default function WorkshopCard({ month, day, title, desc }) {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl bg-white dark:bg-background-dark/50 border border-solid border-[#f4f2f0] dark:border-white/10">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-primary/20 text-primary">
          <span className="text-xs font-bold">{month}</span>
          <span className="text-2xl font-black">{day}</span>
        </div>
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
        </div>
      </div>
      <button className="mt-2 flex w-full justify-center rounded-lg h-10 px-4 bg-primary/20 text-primary text-sm font-bold hover:bg-primary/30 transition-colors">
        Registrarse
      </button>
    </div>
  )
}