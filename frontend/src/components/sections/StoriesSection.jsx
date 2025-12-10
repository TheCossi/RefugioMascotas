// src/components/sections/StoriesSection.jsx
import StoryCard from './StoryCard'

const stories = [
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaxNZ-e2kLa79oRaVb75uSYQ5_MB9SB-aGVTWkDTfh37dKotGsRZZ2nCBVOmXSB3qY9ky2lb2Xj63wMGmH6Gw18R4-5mqyliQsb-J_KuPs7xt12NkbI-8MeOXGvY5Tw-tmLrd90vT59-FTgngQ1c0VL8ypcSjik4qkOoBwAxlaWNPg1qLKUWPwlOWarEpzik-ckLFLv-KqDGMqrgPZCTC0XbMy3Yf25iQaFp0zwtlPLHaekEGvol9X1BZgvD91oYYOhUWhJ_m_iG0",
    quote: "Adoptar a Rocky fue la mejor decisión. Ha traído tanta alegría a nuestro hogar."
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5q9jmX_IL3z2l6nOMnzKpdH-cd_IaBKVGgGMgqXA-8HcvTPxebL5qQnD8esGeTYr3OIxd89xgHiIl1Kbe6PSaS3C-Q2CS12VIhmyDAO74Co04qt5WYbdLZ_8A-VS37ZvhC46wDnJ_amVafhDYnDSQ5rudnytJ_rAUZtJE2gKtLHWbsXziUpxGyD_79JzBVBn5gcYT1D_nAzJ2jXF4znO8XwnuoU1l7wtDWhcA_20JjR30xJ08RoInqEdYwkcRk0AIoHMcaFArynE",
    quote: "Nunca pensé que podría querer tanto a un gato hasta que conocí a Misha. Es mi sombra."
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjgdPg2jtHEpbkxXKRUX0xP5r8Jpy5lJzKT-ckhDSeZ5WIoupnnT3LdkX1p099jHTmfXv2i2lurgFBGm-i3GtPQJ7Mu-yNBACoXha5docJPUEAITUS4IdTimjpVd0_Zvg-ufXxzrVjsF5HGTwUThvU2LY9yUYtKSWNCYZKhPrSaqZEuZx-gshVkLap4ufWaFgu7dP5YQ2fP-oF3Zym-IycTsx_XFQkYdVOgH4uwJL9l9H6Hsiy-z-ev7oa2323eg_jAlPpvh3CROM",
    quote: "Ver a mis hijos crecer con Coco ha sido increíble. Es parte de la familia."
  }
]

export default function StoriesSection({ showAll = false }) {
  const storiesToShow = showAll ? stories : stories.slice(0, 3)

  return (
    <section className="mb-12">
      <h2 className="text-[#181411] dark:text-background-light text-[22px] font-bold leading-tight tracking-[-0.015em] px-0 pb-3 pt-5">
        Historias que Dejan Huella
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-3">
        {storiesToShow.map((story, index) => (
          <StoryCard key={index} {...story} />
        ))}
      </div>
    </section>
  )
}