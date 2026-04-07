import { Briefcase, Heart, TreePine, Users } from "lucide-react"

import type { EventType } from "@/data/eventos"

const icons = { Heart, Briefcase, TreePine, Users }

export default function EventTypeCard({ event }: { event: EventType }) {
  const Icon = icons[event.icon as keyof typeof icons]

  return (
    <article className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex size-14 items-center justify-center rounded-full bg-[#1B6CA8]/10 p-3">
        {Icon ? (
          <Icon className="size-7 text-[#1B6CA8]" aria-hidden="true" />
        ) : null}
      </div>

      <h3 className="mt-5 font-heading text-lg text-[#1C1C1B]">
        {event.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {event.description}
      </p>
    </article>
  )
}
