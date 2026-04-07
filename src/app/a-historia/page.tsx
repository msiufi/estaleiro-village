import Image from "next/image";

import Timeline from "@/components/sections/timeline";

export default function AHistoriaPage() {
  return (
    <>
      <section className="relative h-72 overflow-hidden">
        <Image
          src="/assets/images/47aad0_749ac6df1a064052b333b452692f9592_mv2_d_3968_2976_s_4_2.jpg"
          alt="Foto histórica da Pousada Estaleiro Village"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
          <h1 className="font-heading text-5xl text-white">Nossa História</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="space-y-5 text-base leading-8 text-muted-foreground">
          <p>
            Há 30 anos, a Estaleiro Village cultiva uma história à beira-mar em
            Balneário Camboriú, nascida do desejo de criar um lugar acolhedor
            onde o tempo corre mais devagar e a natureza dita o ritmo dos dias.
          </p>
          <p>
            Construída com herança familiar, amor pelo mar e dedicação em
            receber bem, a pousada cresceu sem perder sua essência: abrir as
            portas para hóspedes que buscam descanso genuíno, afeto nos detalhes
            e memórias que permanecem depois da viagem.
          </p>
        </div>
      </section>

      <Timeline />

      <section className="bg-[#F7F3EE]">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <blockquote className="font-heading text-2xl italic text-ev-neutral-dark">
            <span aria-hidden="true" className="mr-2 text-4xl text-ev-primary">
              “
            </span>
            O mar nos ensinou que a hospitalidade verdadeira nasce do coração.
            <span aria-hidden="true" className="ml-2 text-4xl text-ev-primary">
              ”
            </span>
          </blockquote>
          <p className="mt-4 text-sm tracking-[0.2em] text-muted-foreground uppercase">
            — Família Estaleiro Village
          </p>
        </div>
      </section>
    </>
  );
}
