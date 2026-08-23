const footerLinks = [
  { label: 'Our Story', href: '#story' },
  { label: 'The System', href: '#system' },
  { label: 'Ingredients', href: '#ingredients' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Pre-Order', href: '#preorder' },
  { label: 'Contact', href: 'mailto:hello@montalist.pk' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
]

const socialLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'Facebook', href: '#' },
]

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-12">
          <div>
            <p className="font-sans text-lg tracking-[0.25em] font-medium uppercase text-ivory mb-3">
              MONTALIST
            </p>
            <p className="text-ivory/40 text-sm mb-1">Mountain Skin System</p>
            <p className="text-ivory/30 text-xs italic">
              Born in Chitral. Built for the mountains.
            </p>
          </div>

          <div>
            <p className="text-ivory/30 text-xs tracking-[0.2em] uppercase mb-4">
              Links
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-ivory/50 hover:text-ivory transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-ivory/30 text-xs tracking-[0.2em] uppercase mb-4">
              Social
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-ivory/50 hover:text-ivory transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-ivory/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ivory/25 text-xs">
            &copy; {new Date().getFullYear()} MONTALIST. All rights reserved.
          </p>
          <p className="text-ivory/20 text-[10px] tracking-wider">
            Mountain Skin System — Born in Chitral
          </p>
        </div>
      </div>
    </footer>
  )
}
