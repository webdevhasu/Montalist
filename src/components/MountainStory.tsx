import { useInView } from '@/hooks/useInView'

export function MountainStory() {
  const { ref, isInView } = useInView(0.1)

  return (
    <section id="story" ref={ref} className="py-20 sm:py-32 bg-warm-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div
            className={`transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-stone text-xs tracking-[0.3em] uppercase mb-4">
              Our Story
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal leading-[1.15] mb-6">
              Born in Chitral.
              <br />
              Built for the mountains.
            </h2>
            <div className="space-y-4 text-stone leading-relaxed">
              <p>
                MONTALIST ka idea Chitral se nikla — ek aise environment se jahan
                cold, dry air, wind aur strong sunlight everyday life ka hissa
                hain.
              </p>
              <p>
                Humne socha ke skincare ko sirf generic skin concerns ke around
                nahi, balke environment ke around bhi design kiya ja sakta hai.
              </p>
              <p>
                Yeh Pakistan mein bana hai, lekin internationally credible
                standards ke saath. Chitral ke mountains se inspire hua hai,
                aur unhi environmental conditions ke liye design kiya gaya hai.
              </p>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-200 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative bg-[#f0ede8] rounded-2xl overflow-hidden">
              <img
                src="/images/products/heroproducts.png"
                alt="MONTALIST Mountain Skin System — three products designed for mountain environments"
                className="w-full h-auto object-contain p-6 sm:p-10"
                style={{ aspectRatio: '4/5' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
