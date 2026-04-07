'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigationLinks = [
  { href: '/', label: 'Início' },
  { href: '/a-pousada', label: 'A Pousada' },
  { href: '/a-historia', label: 'A História' },
  { href: '/acomodacoes', label: 'Acomodações' },
  { href: '/eventos', label: 'Eventos' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isMenuOpen])

  const headerIsSolid = isScrolled || isMenuOpen

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        headerIsSolid
          ? 'border-b border-black/10 bg-white text-[#1C1C1B] shadow-sm'
          : 'bg-transparent text-white'
      )}
    >
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Estaleiro Village"
          className="flex items-center"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src="/assets/logos/logo-white.png"
            alt="Estaleiro Village"
            width={160}
            height={50}
            priority
            className={cn(
              'h-auto w-36 transition-all duration-300 sm:w-40',
              headerIsSolid && 'invert'
            )}
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-opacity duration-300 hover:opacity-70"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Link
            href="/#contato"
            className={buttonVariants({ variant: 'default', size: 'sm' })}
          >
            Reserve Agora
          </Link>
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
          className="inline-flex size-10 items-center justify-center rounded-lg transition-all duration-300 hover:bg-black/5 md:hidden"
        >
          {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          'overflow-hidden border-t border-black/10 bg-white text-[#1C1C1B] transition-all duration-300 md:hidden',
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="flex flex-col px-4 py-4 sm:px-6">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border-b border-black/10 py-4 text-base font-medium transition-opacity duration-300 hover:opacity-70"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/#contato"
            className={cn(
              buttonVariants({ variant: 'default', size: 'sm' }),
              'mt-4 w-full'
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            Reserve Agora
          </Link>
        </nav>
      </div>
    </header>
  )
}
