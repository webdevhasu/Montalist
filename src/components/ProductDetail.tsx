import { useInView } from '@/hooks/useInView'
import type { Product } from '@/data/products'

interface ProductDetailProps {
  product: Product
  reversed?: boolean
}

export function ProductDetail({ product, reversed = false }: ProductDetailProps) {
  const { ref, isInView } = useInView(0.05)

  return (
    <section
      ref={ref}
      className={`py-16 sm:py-24 ${product.isHero ? 'bg-ivory' : 'bg-warm-white'}`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div
            className={`transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } ${reversed ? 'md:order-2' : ''}`}
          >
            <div className="relative bg-white rounded-2xl overflow-hidden flex items-center justify-center p-8 sm:p-12">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-contain max-h-[350px] sm:max-h-[420px]"
                loading="lazy"
              />
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-200 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } ${reversed ? 'md:order-1' : ''}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-stone text-xs tracking-wider font-medium">
                {product.number}
              </span>
              <span className="h-[1px] w-6 bg-stone/30" />
              {product.isHero && (
                <span className="text-[10px] tracking-[0.2em] uppercase text-alpine font-medium bg-alpine/10 px-2.5 py-1 rounded-full">
                  Hero Product
                </span>
              )}
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal leading-[1.15] mb-3">
              {product.name}
            </h3>

            <p className="text-stone text-sm mb-6">{product.tagline}</p>

            <p className="text-charcoal/70 leading-relaxed mb-8 text-sm sm:text-base">
              {product.description}
            </p>

            <div className="space-y-3">
              <p className="text-xs tracking-[0.2em] uppercase text-stone mb-3">
                Key Benefits
              </p>
              {product.benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-alpine shrink-0" />
                  <span className="text-charcoal/70 text-sm leading-relaxed">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
