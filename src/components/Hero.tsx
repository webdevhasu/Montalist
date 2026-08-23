import { useInView } from '@/hooks/useInView'

export function Hero() {
  const { ref, isInView } = useInView(0.05)

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ivory"
    >
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 600 Q300 200 600 400 Q900 600 1200 300" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0 650 Q300 250 600 450 Q900 650 1200 350" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0 700 Q300 300 600 500 Q900 700 1200 400" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative z-10 text-center px-5 sm:px-8 max-w-4xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-stone text-xs sm:text-sm tracking-[0.3em] uppercase mb-6 sm:mb-8">
            Mountain Skin System
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-150 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-charcoal leading-[1.1] mb-6 sm:mb-8">
            Paharon mein rehne wali{' '}
            <span className="sm:hidden">skin ke liye</span>
            <br className="hidden sm:block" />
            <span className="hidden sm:inline">skin ke liye skincare.</span>
            <span className="sm:hidden">skincare.</span>
          </h1>
        </div>

        <div
          className={`transition-all duration-1000 delay-300 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-stone text-base sm:text-lg max-w-xl mx-auto mb-10 sm:mb-12 leading-relaxed">
            High-altitude skincare, designed for dry climates and intense UV
            exposure. Chitral se nikla, mountains ke liye banaya gaya.
          </p>
        </div>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          } transition-all duration-1000 delay-[450ms]`}
        >
          <a
            href="#preorder"
            className="px-8 py-3.5 bg-charcoal text-ivory rounded-full text-sm tracking-wide hover:bg-charcoal-light transition-all duration-200 w-full sm:w-auto text-center"
          >
            System Reserve Karein
          </a>
          <a
            href="#system"
            className="px-8 py-3.5 border border-charcoal/20 text-charcoal rounded-full text-sm tracking-wide hover:border-charcoal/40 transition-all duration-200 w-full sm:w-auto text-center"
          >
            System Dekhein
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-[1px] h-10 bg-stone/30 animate-pulse" />
      </div>
    </section>
  )
}
