import { useInView } from '@/hooks/useInView'

export function FinalStatement() {
  const { ref, isInView } = useInView(0.1)

  return (
    <section ref={ref} className="py-20 sm:py-32 bg-warm-white">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <div
          className={`transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal leading-[1.15] mb-6">
            Serious skincare.
            <br />
            Serious environment.
          </h2>
          <p className="text-stone max-w-lg mx-auto leading-relaxed mb-10">
            MONTALIST ek Chitral-based premium Pakistani skincare brand hai jo mountain
            environment ke liye design kiya gaya hai. Chitral Valley ki apni organic skin care brand.
            Transparent ingredients, tested formulations, aur a clear system.
          </p>
          <a
            href="#preorder"
            className="inline-block px-10 py-4 bg-charcoal text-ivory rounded-full text-sm tracking-wide font-medium hover:bg-charcoal-light transition-colors duration-200"
          >
            System Reserve Karein
          </a>
        </div>
      </div>
    </section>
  )
}
