import Image from "next/image"
import { Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { RoomType } from "@/data/accommodations"

interface RoomCardProps {
  room: RoomType
}

export default function RoomCard({ room }: RoomCardProps) {
  const capacityText = `${room.capacity.adults} ${room.capacity.adults === 1 ? "adulto" : "adultos"}, ${room.capacity.children} ${room.capacity.children === 1 ? "criança" : "crianças"}`

  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-video">
        <Image
          src={room.mainImage}
          alt={room.name}
          fill
          quality={90}
          sizes="(max-width: 767px) 100vw, (max-width: 1280px) 50vw, 640px"
          className="object-cover"
        />
      </div>

      <div className="flex h-full flex-col gap-4 p-5">
        <div className="space-y-2">
          <h2 className="font-heading text-xl text-ev-neutral-dark">{room.name}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {room.description}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="size-4 text-ev-primary" aria-hidden="true" />
          <span>{capacityText}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {room.amenities.slice(0, 4).map((amenity) => (
            <Badge key={amenity} variant="muted" className="bg-ev-neutral-light text-ev-neutral-dark">
              {amenity}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-2">
          <p className="text-sm font-medium text-ev-neutral-dark">
            A partir de <span className="text-base text-ev-primary">R$ {room.priceFrom}</span>/noite
          </p>
          <Button variant="default" size="sm">
            Ver detalhes
          </Button>
        </div>
      </div>
    </article>
  )
}
