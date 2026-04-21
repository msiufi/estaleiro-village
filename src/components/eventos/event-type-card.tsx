import {
  Briefcase,
  Camera,
  Flower2,
  Heart,
  Images,
  Music,
  PartyPopper,
  PawPrint,
  Sparkles,
  Video,
  type LucideIcon,
} from "lucide-react"

import type { EventType } from "@/data/eventos"

const iconMap: Record<string, LucideIcon> = {
  Heart,
  PartyPopper,
  PawPrint,
  Flower2,
  Camera,
  Briefcase,
  Music,
  Sparkles,
  Images,
  Video,
}

export default function EventTypeCard({ event }: { event: EventType }) {
  const Icon = iconMap[event.icon]

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
