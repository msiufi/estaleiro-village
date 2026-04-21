import Image from "next/image";
import {
  Car,
  Coffee,
  PawPrint,
  ShieldCheck,
  Trees,
  UtensilsCrossed,
  Waves,
  Wifi,
  Wind,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "A Pousada",
  description:
    "Conheça a Pousada Estaleiro Village: refúgio boutique à beira-mar na Praia do Estaleiro, Balneário Camboriú, com 30 anos de história.",
  path: "/a-pousada",
});

const amenities = [
  { icon: Wifi, label: "Wi-Fi gratuito" },
  { icon: Car, label: "Estacionamento" },
  { icon: Coffee, label: "Café da manhã incluso" },
  { icon: Waves, label: "Acesso à praia" },
  { icon: Trees, label: "Rodeado de natureza" },
  { icon: Wind, label: "Ar-condicionado" },
  { icon: UtensilsCrossed, label: "Área de churrasqueira" },
  { icon: ShieldCheck, label: "Segurança 24h" },
] as const;

const galleryImages = [
  {
    src: "/assets/images/47aad0_33762d8f54c04590aeb08d2109eceeb3_mv2.png",
    alt: "Area externa da Pousada Estaleiro Village",
  },
  {
    src: "/assets/images/47aad0_749ac6df1a064052b333b452692f9592_mv2_d_3968_2976_s_4_2.jpg",
    alt: "Registro historico da pousada",
  },
  {
    src: "/assets/images/frente_20mar_202.jpg",
    alt: "Vista da pousada voltada para o mar",
  },
  {
    src: "/assets/images/jardim_202.jpg",
    alt: "Jardins da Estaleiro Village",
  },
  {
    src: "/assets/images/sobrado_20ricardo.jpg",
    alt: "Chale da pousada",
  },
  {
    src: "/assets/images/IMG_20251125_150745.jpg",
    alt: "Foto da propriedade da Estaleiro Village",
  },
  {
    src: "/assets/images/flickr/pousada-08.jpg",
    alt: "Pousada Estaleiro Village",
  },
  {
    src: "/assets/images/10309741543_e7d8ae74e6_c.jpg",
    alt: "Pousada Estaleiro Village",
  },
  {
    src: "/assets/images/10430020596_736e0f388b_c.jpg",
    alt: "Pousada Estaleiro Village",
  },
  {
    src: "/assets/images/36829524845_8e2b17b5b4_c.jpg",
    alt: "Pousada Estaleiro Village",
  },
  {
    src: "/assets/images/54661554235_216e580305.jpg",
    alt: "Pousada Estaleiro Village",
  },
  {
    src: "/assets/images/flickr/praia-04.jpg",
    alt: "Praia do Estaleiro",
  },
] as const;

export default function APousadaPage() {
  return (
    <>
      <section className="relative h-72 overflow-hidden">
        <Image
          src="/assets/images/47aad0_33762d8f54c04590aeb08d2109eceeb3_mv2.png"
          alt="Vista externa da Pousada Estaleiro Village"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
          <h1 className="font-heading text-5xl text-white">A Pousada</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-heading text-3xl text-ev-neutral-dark sm:text-4xl">
              Refúgio à Beira-Mar
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
              <p>
                Localizada de frente para a Praia do Estaleiro, a Estaleiro
                Village reúne mais de 30 anos de história em uma pousada
                familiar pensada para quem busca descanso com alma e memória.
              </p>
              <p>
                Cercada pela Mata Atlântica e a apenas 50 metros do mar, a
                propriedade oferece um cenário tranquilo, reservado e autêntico
                no litoral de Balneário Camboriú.
              </p>
              <p>
                Com atendimento personalizado e um estilo rústico-chique que
                valoriza materiais naturais, jardins e conforto, cada estadia se
                transforma no refúgio ideal para desacelerar.
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="/assets/images/frente_20mar_202.jpg"
              alt="Vista para o mar na Estaleiro Village"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl text-ev-neutral-dark sm:text-4xl">
              Comodidades
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {amenities.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex min-h-32 flex-col items-center justify-center rounded-xl border border-black/5 bg-[#F7F3EE] px-4 py-6 text-center"
              >
                <Icon className="size-8 text-ev-primary" aria-hidden="true" />
                <p className="mt-4 text-sm font-medium text-ev-neutral-dark">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pet Friendly */}
      <Section className="bg-white">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="order-2 lg:order-1">
            <Badge variant="muted" className="bg-ev-gold/15 text-ev-neutral-dark">
              Pet Friendly
            </Badge>
            <h2 className="mt-3 font-heading text-3xl text-ev-neutral-dark sm:text-4xl">
              Seu melhor amigo também é bem-vindo
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Somos Pet Friendly em todas as acomodações. Amamos animais e
              oferecemos estrutura para que sua família viaje completa: áreas
              verdes dentro da Mata Atlântica, caminhos para passeios e
              recepção calorosa para todos os porte.
            </p>
            <ul className="mt-6 grid gap-3 text-sm text-ev-neutral-dark sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <PawPrint className="size-4 text-ev-primary" /> Aceito em todas as unidades
              </li>
              <li className="flex items-center gap-2">
                <PawPrint className="size-4 text-ev-primary" /> Áreas verdes privativas
              </li>
              <li className="flex items-center gap-2">
                <PawPrint className="size-4 text-ev-primary" /> 9.000 m² em Mata Atlântica
              </li>
              <li className="flex items-center gap-2">
                <PawPrint className="size-4 text-ev-primary" /> Sem taxa adicional
              </li>
            </ul>
          </div>
          <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-2xl shadow-sm lg:order-2">
            <Image
              src="/assets/images/jardim_202.jpg"
              alt="Áreas verdes da pousada onde pets podem se divertir"
              fill
              quality={85}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Piscina & Lazer */}
      <section className="bg-[#F7F3EE]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-ev-primary">
            Lazer & Bem-estar
          </p>
          <h2 className="mt-1 font-heading text-3xl text-ev-neutral-dark sm:text-4xl">
            Piscinas & Área de Lazer
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Relaxe em meio à natureza com vista para o mar
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[1.4fr_1fr]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src="/assets/images/flickr/pousada-08.jpg"
                alt="Área de lazer e piscina externa da Estaleiro Village"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative aspect-[2/3] overflow-hidden rounded-xl">
                <Image
                  src="/assets/images/frente_20mar_202.jpg"
                  alt="Vista do mar na Estaleiro Village"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div className="relative aspect-[2/3] overflow-hidden rounded-xl">
                <Image
                  src="/assets/images/jardim_202.jpg"
                  alt="Jardins da Estaleiro Village"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Piscina externa",
              "Piscina climatizada",
              "Jacuzzis",
              "Vôlei de praia",
              "Área de descanso",
              "Duchas externas",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-black/10 bg-white px-4 py-1.5 text-sm text-ev-neutral-dark"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Gastronomia */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src="/assets/images/36829524845_8e2b17b5b4_c.jpg"
                alt="Gastronomia à beira-mar na Estaleiro Village"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-ev-primary">
                Restaurante
              </p>
              <h2 className="mt-1 font-heading text-3xl text-ev-neutral-dark sm:text-4xl">
                Gastronomia à Beira-Mar
              </h2>
              <p className="mt-6 text-base leading-7 text-muted-foreground">
                Sabores da culinária regional e internacional com vista
                privilegiada para o mar. Ingredientes frescos de Santa
                Catarina em pratos que celebram a gastronomia local.
              </p>

              <ul className="mt-6 space-y-2">
                {[
                  { label: "Jantar", detail: "Qui – Sáb · 19h às 22h" },
                  { label: "Almoço", detail: "Diário · 12h às 15h" },
                  { label: "Café da manhã", detail: "Incluso na estadia" },
                ].map(({ label, detail }) => (
                  <li key={label} className="flex items-center gap-3 text-sm">
                    <span className="size-1.5 shrink-0 rounded-full bg-ev-primary" />
                    <span className="font-medium text-ev-neutral-dark">{label}</span>
                    <span className="text-muted-foreground">{detail}</span>
                  </li>
                ))}
              </ul>

              <a
                href="mailto:contato@estaleirovillage.com?subject=Reserva%20restaurante"
                className="mt-8 inline-flex items-center rounded-md border border-ev-primary px-6 py-2.5 text-sm font-medium text-ev-primary transition hover:bg-ev-primary hover:text-white"
              >
                Reservar mesa →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F3EE]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src="/assets/images/flickr/cafe-04.jpg"
                alt="Cafe da manha na Pousada Estaleiro Village"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div>
              <h2 className="font-heading text-3xl text-ev-neutral-dark sm:text-4xl">
                Café da Manhã
              </h2>
              <p className="mt-6 text-base leading-7 text-muted-foreground">
                Todas as manhas, o café da manhã e preparado com produtos
                frescos e regionais, para começar o dia com sabor e energia em
                um ambiente aconchegante.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl text-ev-neutral-dark sm:text-4xl">
              Galeria
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {galleryImages.map((image) => (
              <div
                key={image.src}
                className="relative aspect-square overflow-hidden rounded-xl"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl text-ev-neutral-dark sm:text-4xl">
            Pronto para sua estadia?
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Entre em contato e planeje dias de descanso entre o mar, os jardins
            e a tranquilidade da Praia do Estaleiro.
          </p>
          <a
            href="https://book.omnibees.com/hotel/18298?lang=pt-BR&currencyId=16"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex rounded-md bg-[#1B6CA8] px-8 py-3 text-white transition hover:bg-[#155a8e]"
          >
            Reserve Agora
          </a>
        </div>
      </section>
    </>
  );
}
