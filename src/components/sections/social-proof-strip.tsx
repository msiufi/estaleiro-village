import { Award, Star, ThumbsUp } from "lucide-react";

export default function SocialProofStrip() {
  return (
    <section className="bg-ev-neutral-dark">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:flex md:items-center md:justify-center md:gap-0 md:divide-x md:divide-white/10">

          <div className="flex items-center gap-3 md:px-8">
            <div className="flex flex-col">
              <span className="text-3xl font-black leading-none text-ev-gold">9.1</span>
              <span className="text-[10px] uppercase tracking-widest text-white/40">/ 10</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Booking.com</span>
              <span className="text-xs text-white/50">405 avaliações verificadas</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:px-8">
            <Star className="size-5 shrink-0 text-ev-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">TripAdvisor</span>
              <span className="text-xs text-white/50">Excelente</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:px-8">
            <Award className="size-5 shrink-0 text-ev-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Praia Bandeira Azul</span>
              <span className="text-xs text-white/50">Certificação Blue Flag</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:px-8">
            <ThumbsUp className="size-5 shrink-0 text-ev-gold" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">+30 anos</span>
              <span className="text-xs text-white/50">de hospitalidade</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
