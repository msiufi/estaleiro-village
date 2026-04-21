"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Users } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { RoomType } from "@/data/accommodations"

interface RoomCardProps {
  room: RoomType
}

export default function RoomCard({ room }: RoomCardProps) {
  const images = room.gallery.length > 0 ? room.gallery : [room.mainImage]
  const [currentIndex, setCurrentIndex] = useState(0)

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length)
  }, [images.length])

  const capacityText = `${room.capacity.adults} ${room.capacity.adults === 1 ? "adulto" : "adultos"}, ${room.capacity.children} ${room.capacity.children === 1 ? "criança" : "crianças"}`

  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Image carousel */}
      <div className="relative aspect-video overflow-hidden">
        {images.map((src, idx) => (
          <div
            key={src}
            aria-hidden={idx !== currentIndex}
            className={[
              "absolute inset-0 transition-opacity duration-300",
              idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0",
            ].join(" ")}
          >
            <Image
              src={src}
              alt={`${room.name} — foto ${idx + 1}`}
              fill
              quality={90}
              sizes="(max-width: 767px) 100vw, (max-width: 1280px) 50vw, 640px"
              className="object-cover"
            />
          </div>
        ))}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white transition hover:bg-black/65"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Próxima foto"
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white transition hover:bg-black/65"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Ir para foto ${i + 1}`}
                  className={[
                    "h-1.5 rounded-full transition-all duration-200",
                    i === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/60",
                  ].join(" ")}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex h-full flex-col gap-4 p-5">
        <div className="space-y-2">
          <h2 className="font-heading text-xl text-ev-neutral-dark">{room.name}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {room.shortDescription}
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
          <Link
            href={`/acomodacoes/${room.id}`}
            className={buttonVariants({ variant: "default", size: "sm" })}
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </article>
  )
}
