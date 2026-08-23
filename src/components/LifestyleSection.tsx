import { useInView } from '@/hooks/useInView'

export function LifestyleSection() {
  const { ref, isInView } = useInView(0.05)

  return (
    <section ref={ref} className="py-16 sm:py-24 bg-warm-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div
          className={`transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-2xl overflow-hidden bg-ivory-dark">
              <img
                src="/images/lifestyle/applying_product.jpg"
                alt="Person applying skincare product"
                className="w-full block"
                loading="lazy"
              />
            </div>
            <div className="rounded-2xl overflow-hidden bg-ivory-dark">
              <img
                src="/images/lifestyle/before_after.jpg"
                alt="Skin texture and results"
                className="w-full block"
                loading="lazy"
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-stone text-xs tracking-[0.2em] uppercase">
              Real skin. Real environments. Real results.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
