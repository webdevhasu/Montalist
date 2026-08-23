import { useState } from 'react'
import { faqData } from '@/data/content'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

export function FAQSection() {
  const { ref, isInView } = useInView(0.05)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" ref={ref} className="py-20 sm:py-32 bg-ivory">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div
          className={`transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-stone text-xs tracking-[0.3em] uppercase mb-4">
              FAQ
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal leading-[1.15]">
              Aksar Pooche Jane Wale Sawalat
            </h2>
          </div>

          <div className="space-y-0 border-t border-charcoal/[0.06]">
            {faqData.map((item, i) => (
              <div
                key={i}
                className={cn(
                  'border-b border-charcoal/[0.06] transition-all duration-300',
                  isInView ? 'opacity-100' : 'opacity-0'
                )}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 sm:py-6 text-left group"
                  aria-expanded={openIndex === i}
                >
                  <span className="font-sans text-sm sm:text-base text-charcoal font-medium pr-4">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      'flex-shrink-0 w-6 h-6 rounded-full border border-charcoal/10 flex items-center justify-center transition-transform duration-300',
                      openIndex === i && 'rotate-45'
                    )}
                  >
                    <svg
                      viewBox="0 0 12 12"
                      className="w-3 h-3 text-stone"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M6 2v8M2 6h8" />
                    </svg>
                  </span>
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    openIndex === i ? 'max-h-64 pb-5 sm:pb-6' : 'max-h-0'
                  )}
                >
                  <p className="text-stone text-sm leading-relaxed whitespace-pre-line">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
