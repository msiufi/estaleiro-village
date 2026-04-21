import Image from "next/image";

import Timeline from "@/components/sections/timeline";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Nossa História",
  description:
    "30 anos de história da Pousada Estaleiro Village. Uma família, um sonho e o amor pelo mar em Balneário Camboriú.",
  path: "/a-historia",
});

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
            Tudo começou em 1986, quando David e Kitty — um casal argentino
            apaixonado pelo Brasil — ergueram as primeiras duas cabanas em
            meio à Mata Atlântica da Praia do Estaleiro. O sonho era simples e
            profundo: um refúgio onde hospedagem, natureza e família
            caminhassem juntas.
          </p>
          <p>
            Quatro décadas depois, a pousada é hoje um charmoso complexo
            turístico com 11 acomodações, 9.000 m² de reserva privada e três
            gerações da família envolvidas diretamente na operação. A filosofia
            original se mantém: &ldquo;respeito e integração à mata&rdquo; — e
            cada hóspede é recebido como parte da família Estaleiro Village.
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
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl text-ev-neutral-dark sm:text-4xl">
            Venha fazer parte dessa historia
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Mais de 30 anos de hospitalidade te esperam na Praia do Estaleiro.
          </p>
          <a
            href="https://book.omnibees.com/hotel/18298?lang=pt-BR&currencyId=16"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex rounded-md bg-[#1B6CA8] px-8 py-3 text-white transition hover:bg-[#155a8e]"
          >
            Reserve sua estadia
          </a>
        </div>
      </section>
    </>
  );
}
