import { products } from '@/data/products'
import { useInView } from '@/hooks/useInView'

export function SystemSection() {
  const { ref, isInView } = useInView(0.05)

  return (
    <section id="system" ref={ref} className="py-20 sm:py-32 bg-warm-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14 sm:mb-20">
          <p className="text-stone text-xs tracking-[0.3em] uppercase mb-4">
            The System
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal leading-[1.15] mb-5">
            3 Products. Ek Simple System.
          </h2>
          <p className="text-stone max-w-xl mx-auto leading-relaxed">
            Teen alag random products ke bajaye ek simple AM/PM system jo
            mountain environment ke around design kiya gaya hai.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product, i) => (
            <div
              key={product.id}
              className={`group relative bg-ivory rounded-2xl overflow-hidden border border-charcoal/[0.04] hover:border-charcoal/[0.08] transition-all duration-500 ${
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="relative bg-white rounded-t-2xl flex items-center justify-center p-8 sm:p-10 pt-10 sm:pt-14 pb-6 sm:pb-8">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain max-h-[260px] sm:max-h-[300px] group-hover:scale-[1.02] transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-stone text-xs tracking-wider font-medium">
                    {product.number}
                  </span>
                  <span className="h-[1px] w-6 bg-stone/30" />
                  <span className="text-stone text-xs tracking-wider uppercase">
                    {product.position}
                  </span>
                </div>
                <h3 className="font-sans text-lg font-medium text-charcoal mb-2">
                  {product.name}
                </h3>
                <p className="text-stone text-sm leading-relaxed">
                  {product.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
