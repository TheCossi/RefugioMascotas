// src/components/sections/StoryCard.jsx
export default function StoryCard({ image, quote }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl overflow-hidden bg-white dark:bg-background-dark/50 border border-solid border-[#f4f2f0] dark:border-white/10">
      <img className="w-full h-48 object-cover" src={image} alt="Historia de adopción" />
      <p className="p-4 text-sm italic text-gray-700 dark:text-gray-300">"{quote}"</p>
    </div>
  )
}