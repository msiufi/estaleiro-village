import Image from "next/image";
import {
  Car,
  Coffee,
  ShieldCheck,
  Trees,
  UtensilsCrossed,
  Waves,
  Wifi,
  Wind,
} from "lucide-react";
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
                Cafe da Manha
              </h2>
              <p className="mt-6 text-base leading-7 text-muted-foreground">
                Todas as manhas, o cafe da manha e preparado com produtos
                frescos e regionais, para comecar o dia com sabor e energia em
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
