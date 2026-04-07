import Image from "next/image";
import Link from "next/link";

export default function EventsTeaser() {
  return (
    <section className="relative min-h-[400px] overflow-hidden">
      <Image
        src="/assets/images/47aad0_33762d8f54c04590aeb08d2109eceeb3_mv2.png"
        alt="Área externa da pousada preparada para eventos"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 mx-auto flex min-h-[400px] max-w-4xl flex-col items-center justify-center px-4 text-center text-white sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl sm:text-4xl">
          Realize seu evento na praia
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
          Um cenário exclusivo para celebrações, encontros especiais e eventos
          com a atmosfera única da Praia do Estaleiro.
        </p>
        <Link
          href="/eventos"
          className="mt-8 rounded-md border border-white px-8 py-3 text-white transition hover:bg-white/10"
        >
          Saiba mais
        </Link>
      </div>
    </section>
  );
}
