import { useInView } from '@/hooks/useInView'

const BUNDLE_PRICE = 2999

export function BundleSection() {
  const { ref, isInView } = useInView(0.05)

  return (
    <section ref={ref} className="py-20 sm:py-32 bg-charcoal text-ivory">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div
          className={`transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-14 sm:mb-20">
            <p className="text-ivory/50 text-xs tracking-[0.3em] uppercase mb-4">
              Chitral's Mountain Skin System
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ivory leading-[1.15] mb-5">
              3 Products. Ek Simple System.
            </h2>
            <p className="text-ivory/60 max-w-xl mx-auto leading-relaxed">
              Chitral Valley ke liye teen alag random products ke bajaye ek simple AM/PM system jo
              mountain environment ke around design kiya gaya hai. Best skincare products in Chitral.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-14 sm:mb-16">
            {[
              { num: '01', name: 'Gentle Barrier Face Wash', img: '/images/products/facewash.png' },
              { num: '02', name: 'High-Altitude SPF 50+', img: '/images/products/sunblock.png' },
              { num: '03', name: 'Barrier Night Cream', img: '/images/products/nighcream.png' },
            ].map((item, i) => (
              <div
                key={item.num}
                className={`text-center transition-all duration-700 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 120 + 200}ms` }}
              >
                <div className="aspect-square bg-white rounded-2xl mb-4 sm:mb-6 flex items-center justify-center p-8 sm:p-10">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-contain max-h-[140px] sm:max-h-[180px]"
                    loading="lazy"
                  />
                </div>
                <p className="text-ivory/40 text-xs tracking-wider mb-1">{item.num}</p>
                <p className="text-ivory text-xs sm:text-sm font-medium">{item.name}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="mb-8">
              <p className="text-ivory/50 text-xs tracking-[0.2em] uppercase mb-3">
                Launch Kit Price
              </p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-ivory text-4xl sm:text-5xl font-serif">
                  Rs {BUNDLE_PRICE.toLocaleString()}
                </span>
              </div>
              <p className="text-alpine-light text-sm mt-2">Free Delivery</p>
            </div>

            <a
              href="#preorder"
              className="inline-block px-10 py-4 bg-ivory text-charcoal rounded-full text-sm tracking-wide font-medium hover:bg-warm-white transition-colors duration-200 w-full sm:w-auto text-center"
            >
              System Reserve Karein
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
