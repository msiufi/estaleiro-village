"use client"

import { useState } from "react"
import Image from "next/image"

import RoomCard from "@/components/accommodations/room-card"
import { roomTypeLabels, rooms, type RoomCategory } from "@/data/accommodations"

type FilterKey = "all" | RoomCategory

const filters: Array<{ value: FilterKey; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "suite", label: roomTypeLabels.suite },
  { value: "studio", label: roomTypeLabels.studio },
  { value: "flat", label: roomTypeLabels.flat },
  { value: "chale", label: roomTypeLabels.chale },
  { value: "sobrado", label: roomTypeLabels.sobrado },
  { value: "loft", label: roomTypeLabels.loft },
  { value: "duplex", label: roomTypeLabels.duplex },
]

export default function AccommodacoesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all")

  const filteredRooms =
    activeFilter === "all"
      ? rooms
      : rooms.filter((room) => room.type === activeFilter)

  return (
    <div className="pb-16">
      <section className="relative h-64 overflow-hidden">
        <Image
          src="/assets/images/7236364408_92d3d48c97_c.jpg"
          alt="Vista da pousada e da praia do Estaleiro"
          fill
          preload
          quality={100}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
          <h1 className="font-heading text-4xl text-white sm:text-5xl">
            Acomodações
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="my-8 flex flex-wrap justify-center gap-2">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={[
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "border-ev-primary bg-ev-primary text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50",
                ].join(" ")}
              >
                {filter.label}
              </button>
            )
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </div>
  )
}
