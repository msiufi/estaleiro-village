import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { heroData } from "@/data/homepage";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        src="/assets/images/frente_20mar_202.jpg"
        alt="Vista da Pousada Estaleiro Village de frente para o mar"
        fill
        preload
        className="object-cover"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-28 text-center text-white sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl leading-tight sm:text-5xl lg:text-7xl">
          {heroData.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
          {heroData.subtitle}
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/acomodacoes"
            className="rounded-md bg-[#1B6CA8] px-8 py-3 text-white transition hover:bg-[#155a8e]"
          >
            {heroData.ctaPrimary}
          </Link>
          <Link
            href="/#contato"
            className="rounded-md border border-white px-8 py-3 text-white transition hover:bg-white/10"
          >
            {heroData.ctaSecondary}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white">
        <ChevronDown className="size-9 animate-bounce" aria-hidden="true" />
      </div>
    </section>
  );
}
