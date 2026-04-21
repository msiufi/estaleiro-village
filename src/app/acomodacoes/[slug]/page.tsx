import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Users, BedDouble, Ruler, Eye, UtensilsCrossed, PawPrint, ArrowLeft } from "lucide-react"

import { rooms } from "@/data/accommodations"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { createMetadata } from "@/lib/metadata"

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.id }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const room = rooms.find((r) => r.id === slug)
  if (!room) return createMetadata({ title: "Acomodação não encontrada", path: "/acomodacoes" })

  return createMetadata({
    title: `${room.name} | Estaleiro Village`,
    description: room.shortDescription,
    path: `/acomodacoes/${room.id}`,
  })
}

const viewLabels: Record<string, string> = {
  mar: "Vista Mar",
  jardim: "Vista Jardim",
  mata: "Vista Mata",
  mista: "Vista Mista",
}

export default async function AccommodationDetailPage({ params }: PageProps) {
  const { slug } = await params
  const room = rooms.find((r) => r.id === slug)

  if (!room) notFound()

  return (
    <main>
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src={room.mainImage}
          alt={room.name}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <Link
            href="/acomodacoes"
            className="mb-4 inline-flex items-center gap-2 text-sm text-white/80 transition hover:text-white"
          >
            <ArrowLeft className="size-4" /> Todas as acomodações
          </Link>
          <h1 className="font-heading text-4xl text-white sm:text-5xl">
            {room.name}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/90 sm:text-lg">
            {room.shortDescription}
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-2xl text-ev-neutral-dark sm:text-3xl">
                Sobre a acomodação
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                {room.longDescription}
              </p>
            </div>

            <div>
              <h3 className="font-heading text-xl text-ev-neutral-dark">Destaques</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {room.highlights.map((h) => (
                  <Badge key={h} variant="muted" className="bg-ev-gold/10 text-ev-neutral-dark">
                    {h}
                  </Badge>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-xl text-ev-neutral-dark">Comodidades</h3>
              <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                {room.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-ev-primary" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="self-start rounded-2xl border border-black/10 bg-ev-neutral-light p-6 shadow-sm lg:sticky lg:top-24">
            <h3 className="font-heading text-xl text-ev-neutral-dark">Detalhes</h3>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Users className="mt-0.5 size-5 shrink-0 text-ev-primary" />
                <div>
                  <dt className="font-medium text-ev-neutral-dark">Capacidade</dt>
                  <dd className="text-muted-foreground">
                    {room.capacity.adults} adultos
                    {room.capacity.children > 0 && `, até ${room.capacity.children} crianças`}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BedDouble className="mt-0.5 size-5 shrink-0 text-ev-primary" />
                <div>
                  <dt className="font-medium text-ev-neutral-dark">Camas</dt>
                  <dd className="text-muted-foreground">{room.beds}</dd>
                </div>
              </div>
              {room.areaM2 && (
                <div className="flex items-start gap-3">
                  <Ruler className="mt-0.5 size-5 shrink-0 text-ev-primary" />
                  <div>
                    <dt className="font-medium text-ev-neutral-dark">Área</dt>
                    <dd className="text-muted-foreground">{room.areaM2} m²</dd>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <Eye className="mt-0.5 size-5 shrink-0 text-ev-primary" />
                <div>
                  <dt className="font-medium text-ev-neutral-dark">Vista</dt>
                  <dd className="text-muted-foreground">{viewLabels[room.view]}</dd>
                </div>
              </div>
              {room.hasKitchen && (
                <div className="flex items-start gap-3">
                  <UtensilsCrossed className="mt-0.5 size-5 shrink-0 text-ev-primary" />
                  <div>
                    <dt className="font-medium text-ev-neutral-dark">Cozinha</dt>
                    <dd className="text-muted-foreground">Equipada</dd>
                  </div>
                </div>
              )}
              {room.petFriendly && (
                <div className="flex items-start gap-3">
                  <PawPrint className="mt-0.5 size-5 shrink-0 text-ev-primary" />
                  <div>
                    <dt className="font-medium text-ev-neutral-dark">Pet Friendly</dt>
                    <dd className="text-muted-foreground">Sim, trazemos seu melhor amigo</dd>
                  </div>
                </div>
              )}
            </dl>

            <div className="mt-6 border-t border-black/10 pt-5">
              <p className="text-sm text-muted-foreground">A partir de</p>
              <p className="font-heading text-3xl text-ev-primary">
                R$ {room.priceFrom}
                <span className="text-sm font-normal text-muted-foreground"> / noite</span>
              </p>
              <a
                href="https://book.omnibees.com/hotel/18298?lang=pt-BR&currencyId=16"
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: "default", size: "lg" }) + " mt-4 w-full"}
              >
                Reservar agora
              </a>
              <a
                href="https://wa.me/5547991125300?text=Ol%C3%A1!%20Gostaria%20de%20reservar%20a%20acomoda%C3%A7%C3%A3o%20"
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: "outline", size: "lg" }) + " mt-3 w-full"}
              >
                Falar no WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </Section>

      {room.gallery.length > 1 && (
        <Section className="bg-ev-neutral-light">
          <h2 className="font-heading text-2xl text-ev-neutral-dark sm:text-3xl">
            Galeria
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {room.gallery.map((src, i) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={src}
                  alt={`${room.name} — foto ${i + 1}`}
                  fill
                  quality={85}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section className="bg-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl text-ev-neutral-dark sm:text-3xl">
            Pronto para reservar {room.name}?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Garanta sua estadia no paraíso à beira-mar.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="https://book.omnibees.com/hotel/18298?lang=pt-BR&currencyId=16"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              Reservar agora
            </a>
            <Link
              href="/acomodacoes"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Ver outras acomodações
            </Link>
          </div>
        </div>
      </Section>
    </main>
  )
}
