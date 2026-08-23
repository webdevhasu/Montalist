import { useState, useEffect } from 'react'
import { navLinks } from '@/data/content'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-ivory/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between h-16 sm:h-18">
        <a href="#" className="relative z-10" aria-label="MONTALIST Home">
          <span className="font-sans text-lg sm:text-xl tracking-[0.25em] font-medium uppercase text-charcoal">
            MONTALIST
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-stone hover:text-charcoal transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#preorder"
            className="ml-2 px-5 py-2 text-sm tracking-wide bg-charcoal text-ivory rounded-full hover:bg-charcoal-light transition-colors duration-200"
          >
            Reserve
          </a>
        </div>

        <button
          className="md:hidden relative z-10 p-2 -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={cn(
                'block h-[1.5px] bg-charcoal transition-all duration-300 origin-left',
                mobileOpen && 'rotate-45 translate-y-[1px]'
              )}
            />
            <span
              className={cn(
                'block h-[1.5px] bg-charcoal transition-all duration-300',
                mobileOpen && 'opacity-0'
              )}
            />
            <span
              className={cn(
                'block h-[1.5px] bg-charcoal transition-all duration-300 origin-left',
                mobileOpen && '-rotate-45 -translate-y-[1px]'
              )}
            />
          </div>
        </button>
      </nav>

      <div
        className={cn(
          'md:hidden fixed inset-0 top-16 bg-ivory/98 backdrop-blur-lg transition-all duration-300',
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex flex-col items-center justify-center gap-8 pt-20">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-lg tracking-wide text-charcoal hover:text-stone transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#preorder"
            className="px-8 py-3 text-base tracking-wide bg-charcoal text-ivory rounded-full"
            onClick={() => setMobileOpen(false)}
          >
            System Reserve Karein
          </a>
        </div>
      </div>
    </header>
  )
}
