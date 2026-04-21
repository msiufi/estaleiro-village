import Image from "next/image"

import ContactForm from "@/components/eventos/contact-form"
import EventTypeCard from "@/components/eventos/event-type-card"
import { eventTypes, statsItems } from "@/data/eventos"
import { createMetadata } from "@/lib/metadata"

export const metadata = createMetadata({
  title: "Eventos & Grupos",
  description:
    "Realize seu evento à beira-mar na Pousada Estaleiro Village. Casamentos, confraternizações, retiros e workshops em Balneário Camboriú.",
  path: "/eventos",
})

const galleryImages = [
  {
    src: "/assets/images/47aad0_33762d8f54c04590aeb08d2109eceeb3_mv2.png",
    alt: "Espaço externo da pousada preparado para eventos",
  },
  {
    src: "/assets/images/jardim_202.jpg",
    alt: "Jardim da Pousada Estaleiro Village",
  },
  {
    src: "/assets/images/sobrado_20ricardo.jpg",
    alt: "Estrutura de hospedagem da pousada",
  },
  {
    src: "/assets/images/7236364408_92d3d48c97_c.jpg",
    alt: "Vista da estrutura a beira-mar",
  },
]

export default function EventosPage() {
  return (
    <>
      <section className="relative min-h-[500px] overflow-hidden">
        <Image
          src="/assets/images/frente_20mar_202.jpg"
          alt="Vista frontal da Pousada Estaleiro Village para eventos"
          fill
          preload
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 mx-auto flex min-h-[500px] max-w-4xl flex-col items-center justify-center px-4 text-center text-white sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl leading-tight sm:text-5xl">
            Eventos & Grupos
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
            Um refugio exclusivo na Praia do Estaleiro para celebracoes,
            encontros corporativos e experiencias em grupo com atendimento
            personalizado.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-8 text-muted-foreground sm:text-lg">
            Ha 30 anos realizando momentos inesquecíveis a beira-mar, a Pousada
            Estaleiro Village oferece um cenario natural unico para eventos que
            pedem charme, privacidade e autenticidade.
          </p>
          <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
            Com estrutura para diferentes formatos de encontro, recebemos desde
            celebracoes intimistas ate grupos corporativos e retiros, sempre com
            atendimento proximo e solucoes personalizadas para cada ocasiao.
          </p>
        </div>
      </section>

      <section className="bg-[#F7F3EE] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-heading text-3xl text-[#1C1C1B] sm:text-4xl">
              Nossos Servicos
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {eventTypes.map((event) => (
              <EventTypeCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 text-center sm:flex-row sm:gap-12">
          {statsItems.map((item) => (
            <div key={item.label} className="min-w-0">
              <p className="text-2xl font-bold text-[#1C1C1B] sm:text-3xl">
                {item.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F7F3EE] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-heading text-3xl text-[#1C1C1B] sm:text-4xl">
              Nossa Estrutura
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {galleryImages.map((image) => (
              <div
                key={image.src}
                className="relative aspect-video overflow-hidden rounded-xl"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h2 className="font-heading text-3xl text-[#1C1C1B] sm:text-4xl">
              Fale Conosco
            </h2>
          </div>

          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}