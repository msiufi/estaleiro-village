import Image from 'next/image'
import Link from 'next/link'
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

const navigationLinks = [
  { href: '/', label: 'Início' },
  { href: '/a-pousada', label: 'A Pousada' },
  { href: '/a-historia', label: 'A História' },
  { href: '/acomodacoes', label: 'Acomodações' },
  { href: '/eventos', label: 'Eventos' },
]

const instagramUrl = 'https://www.instagram.com/pousadaestaleirovillageoficial/'

export default function Footer() {
  return (
    <footer className="bg-[#1C1C1B] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-4">
          <Link href="/" aria-label="Estaleiro Village" className="inline-flex">
            <Image
              src="/assets/logos/logo-white.png"
              alt="Estaleiro Village"
              width={140}
              height={44}
              className="h-auto w-[140px]"
            />
          </Link>
          <p className="text-sm text-white/70">Pousada boutique à beira-mar</p>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex text-sm text-white/80 transition-opacity duration-300 hover:opacity-70"
          >
            @pousadaestaleirovillageoficial
          </a>
        </div>

        <div className="space-y-4">
          <h2 className="font-heading text-lg">Navegação</h2>
          <nav className="flex flex-col gap-3">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/80 transition-opacity duration-300 hover:opacity-70"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          <h2 className="font-heading text-lg">Contato</h2>
          <div className="space-y-3 text-sm text-white/80">
            <p>Praia do Estaleiro, Balneário Camboriú, SC</p>
            <a
              href="mailto:contato@estaleirovillage.com"
              className="block transition-opacity duration-300 hover:opacity-70"
            >
              contato@estaleirovillage.com
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram da Estaleiro Village"
              className="inline-flex items-center gap-2 transition-opacity duration-300 hover:opacity-70"
            >
              <InstagramIcon className="size-4" />
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-sm text-white/60 sm:px-6 lg:px-8">
          © 2026 Estaleiro Village. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
