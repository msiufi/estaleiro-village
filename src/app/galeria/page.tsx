"use client"

import { useState, useMemo } from "react"
import Image from "next/image"

import { Section } from "@/components/ui/section"
import Lightbox from "@/components/ui/lightbox"
import { galeriaItems, type GaleriaItem } from "@/data/galeria"

const categories: Array<{ value: "all" | GaleriaItem["category"]; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "pousada", label: "Pousada" },
  { value: "acomodacoes", label: "Acomodações" },
  { value: "praia", label: "Praia" },
  { value: "gastronomia", label: "Gastronomia" },
  { value: "eventos", label: "Eventos" },
]

export default function GaleriaPage() {
  const [filter, setFilter] = useState<(typeof categories)[number]["value"]>("all")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = useMemo(
    () => (filter === "all" ? galeriaItems : galeriaItems.filter((i) => i.category === filter)),
    [filter]
  )

  return (
    <main>
      <section className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <Image
          src="/assets/images/exterior-jardim/exterior-jardim-02.jpg"
          alt="Galeria Estaleiro Village"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl text-white sm:text-5xl">Galeria</h1>
          <p className="mt-3 text-base text-white/90">Nossa pousada em imagens</p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setFilter(c.value)}
              className={[
                "rounded-full px-4 py-2 text-sm font-medium transition",
                filter === c.value
                  ? "bg-ev-primary text-white"
                  : "bg-ev-neutral-light text-ev-neutral-dark hover:bg-ev-primary/10",
              ].join(" ")}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item, idx) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className="relative aspect-[4/3] overflow-hidden rounded-xl transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ev-primary"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </Section>

      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length))}
          onNext={() => setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length))}
        />
      )}
    </main>
  )
}
