"use client"

import { useState } from "react"
import Image from "next/image"

import RoomCard from "@/components/accommodations/room-card"
import { roomTypeLabels, rooms, type RoomType } from "@/data/accommodations"

type FilterKey = "all" | RoomType["type"]

const filterOrder: FilterKey[] = ["all", "suite", "studio", "flat", "chale"]

const filterLabels: Record<FilterKey, string> = {
  all: "Todos",
  suite: roomTypeLabels.suite,
  studio: roomTypeLabels.studio,
  flat: roomTypeLabels.flat,
  chale: roomTypeLabels.chale,
}

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
          {filterOrder.map((filter) => {
            const isActive = activeFilter === filter

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={[
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "border-ev-primary bg-ev-primary text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50",
                ].join(" ")}
              >
                {filterLabels[filter]}
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
