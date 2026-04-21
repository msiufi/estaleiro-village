import Image from "next/image"

import { Section } from "@/components/ui/section"

const badges = [
  {
    src: "/assets/logos/Blue_Flag_Logo_svg.png",
    alt: "Certificación Blue Flag",
    title: "Bandeira Azul",
    description: "Praia do Estaleiro certificada",
  },
  {
    src: "/assets/logos/WTTC_logo_safe_travels-removebg-preview.png",
    alt: "WTTC Safe Travels",
    title: "Safe Travels",
    description: "Selo WTTC de hospitalidade segura",
  },
  {
    src: "/assets/logos/Riviera_Costa_Brava-LOGO_BLOG.png",
    alt: "Riviera Costa Brava",
    title: "Riviera Costa Brava",
    description: "Parceira oficial do destino",
  },
]

export default function TrustBadges() {
  return (
    <Section className="bg-white">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="font-heading text-2xl text-ev-neutral-dark sm:text-3xl">
            Reconhecimentos e certificações
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Padrões internacionais de qualidade, segurança e sustentabilidade.
          </p>
        </div>

        <ul className="mt-10 grid gap-8 sm:grid-cols-3">
          {badges.map((b) => (
            <li key={b.title} className="flex flex-col items-center text-center">
              <div className="relative flex h-20 w-28 items-center justify-center">
                <Image
                  src={b.src}
                  alt={b.alt}
                  fill
                  sizes="112px"
                  className="object-contain"
                />
              </div>
              <h3 className="mt-4 font-semibold text-ev-neutral-dark">{b.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{b.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
