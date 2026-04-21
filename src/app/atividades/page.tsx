import Image from "next/image"

import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { atividadesProximas, atividadesDoLocal, type Atividade } from "@/data/atividades"
import { createMetadata } from "@/lib/metadata"

export const metadata = createMetadata({
  title: "Atividades e Atrações | Estaleiro Village",
  description:
    "Atividades no local e atrações da região: Beto Carrero, Parque Unipraias, trilhas na Mata Atlântica e muito mais próximo à Pousada Estaleiro Village.",
  path: "/atividades",
})

const categoryLabels: Record<Atividade["category"], string> = {
  aventura: "Aventura",
  familia: "Família",
  natureza: "Natureza",
  cultura: "Cultura",
}

export default function AtividadesPage() {
  return (
    <main>
      <section className="relative h-[50vh] min-h-[350px] w-full overflow-hidden">
        <Image
          src="/assets/images/10309741543_e7d8ae74e6_c.jpg"
          alt="Natureza da Praia do Estaleiro"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl text-white sm:text-5xl">
            Atividades e Atrações
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/90 sm:text-lg">
            Há muito o que descobrir — no refúgio e na região.
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl text-ev-neutral-dark sm:text-4xl">
            No Estaleiro Village
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Nossos 9.000 m² de Mata Atlântica preservada oferecem atividades ao ar livre e contato direto com a natureza.
          </p>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {atividadesDoLocal.map((a) => (
            <li
              key={a.id}
              className="rounded-2xl border border-black/5 bg-ev-neutral-light p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-heading text-lg text-ev-neutral-dark">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="bg-ev-neutral-light">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl text-ev-neutral-dark sm:text-4xl">
            Na região
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Atrações turísticas a poucos minutos da pousada: do maior parque temático da América Latina às vistas panorâmicas de Balneário Camboriú.
          </p>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {atividadesProximas.map((a) => (
            <li
              key={a.id}
              className="flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-2">
                <Badge variant="muted" className="bg-ev-primary/10 text-ev-primary">
                  {categoryLabels[a.category]}
                </Badge>
                {a.distanceKm && (
                  <span className="text-xs text-muted-foreground">
                    {a.distanceKm} km da pousada
                  </span>
                )}
              </div>
              <h3 className="font-heading text-xl text-ev-neutral-dark">{a.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{a.description}</p>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  )
}
