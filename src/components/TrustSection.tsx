import { trustItems } from '@/data/content'
import { useInView } from '@/hooks/useInView'

export function TrustSection() {
  const { ref, isInView } = useInView(0.05)

  return (
    <section ref={ref} className="py-20 sm:py-32 bg-warm-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14 sm:mb-20">
          <p className="text-stone text-xs tracking-[0.3em] uppercase mb-4">
            Transparency
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal leading-[1.15] mb-5 max-w-2xl mx-auto">
            Hum kya verify kareinge?
          </h2>
          <p className="text-stone max-w-2xl mx-auto leading-relaxed">
            Final launch claims testing aur validation ke baad confirm kiye
            jayenge. Hum yeh process aapke saath share karna zaroori samajhte
            hain.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trustItems.map((item, i) => (
            <div
              key={item.title}
              className={`p-6 bg-ivory rounded-xl border border-charcoal/[0.04] transition-all duration-500 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-8 h-8 rounded-full bg-alpine/10 flex items-center justify-center mb-4">
                <svg
                  viewBox="0 0 16 16"
                  className="w-4 h-4 text-alpine"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M3 8l3 3 7-7" />
                </svg>
              </div>
              <h4 className="font-sans text-sm font-medium text-charcoal mb-1.5">
                {item.title}
              </h4>
              <p className="text-stone text-xs leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
