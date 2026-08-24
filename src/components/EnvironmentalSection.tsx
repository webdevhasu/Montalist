import { useInView } from '@/hooks/useInView'

const envFactors = [
  {
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="10" />
        <path d="M16 6v2M16 24v2M6 16h2M24 16h2M9 9l1.5 1.5M21.5 21.5L23 23M9 23l1.5-1.5M21.5 10.5L23 9" />
      </svg>
    ),
    title: 'Strong UV Exposure',
    description:
      'Chitral mein higher altitude ki wajah se UV radiation zyada hota hai. Daily protection essential hai.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 24c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        <path d="M12 16c0-2.2 1.8-4 4-4s4 1.8 4 4" />
        <path d="M14 12c0-1.1.9-2 2-2s2 .9 2 2" />
        <circle cx="16" cy="6" r="2" />
      </svg>
    ),
    title: 'Dry Air',
    description:
      'Kam humidity wali hawa skin se moisture chura sakti hai. Regular moisturizing aur barrier support important ho jaata hai.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 16h24M8 10h16M6 22h20" />
        <path d="M12 10c2 2 4 2 6 0" />
        <path d="M10 22c2-2 4-2 6 0" />
      </svg>
    ),
    title: 'Wind Exposure',
    description:
      'Tez hawa skin ki outer layer ko disturb kar sakti hai. Barrier-supportive ingredients help karte hain skin ko protect karne mein.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 28V8l14 6-14 6" />
        <path d="M24 14v14" />
      </svg>
    ),
    title: 'Cold Weather',
    description:
      'Thand ke mausam mein skin naturally dry aur tight feel hoti hai. Night-time support aur barrier repair zaroori ho jaata hai.',
  },
]

export function EnvironmentalSection() {
  const { ref, isInView } = useInView(0.05)

  return (
    <section ref={ref} className="py-20 sm:py-32 bg-ivory">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14 sm:mb-20">
          <p className="text-stone text-xs tracking-[0.3em] uppercase mb-4">
            The Environment
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal leading-[1.15] mb-5 max-w-3xl mx-auto">
            Chitral mein skincare kyun different feel ho sakti hai?
          </h2>
          <p className="text-stone max-w-2xl mx-auto leading-relaxed">
            Chitral Valley mein rehne wale log daily in environmental
            conditions ka saamna karte hain jo skin ko zyada stress dein sakti
            hain — high altitude, dry air, cold weather, aur intense UV exposure.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-14 sm:mb-20">
          {envFactors.map((factor, i) => (
            <div
              key={factor.title}
              className={`p-6 sm:p-8 bg-warm-white rounded-xl border border-charcoal/[0.04] transition-all duration-700 ${
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="text-stone mb-4">{factor.icon}</div>
              <h3 className="font-sans text-base font-medium text-charcoal mb-2">
                {factor.title}
              </h3>
              <p className="text-stone text-sm leading-relaxed">
                {factor.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mb-10">
          <h3 className="font-serif text-2xl sm:text-3xl text-charcoal leading-[1.15] mb-5 max-w-2xl mx-auto">
            Mountain environment mein skin ko kya face karna padta hai?
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="p-6 sm:p-8 bg-warm-white rounded-xl border border-charcoal/[0.04]">
            <h4 className="font-sans text-sm font-medium text-charcoal mb-3">
              Dry Air = Moisture Loss
            </h4>
            <p className="text-stone text-sm leading-relaxed">
              Kam humidity wali hawa skin se moisture chura sakti hai.
              Regular moisturizing aur barrier support important ho jaata
              hai.
            </p>
          </div>
          <div className="p-6 sm:p-8 bg-warm-white rounded-xl border border-charcoal/[0.04]">
            <h4 className="font-sans text-sm font-medium text-charcoal mb-3">
              Cold = Dry &amp; Tight Skin
            </h4>
            <p className="text-stone text-sm leading-relaxed">
              Thand ke mausam mein skin naturally dry aur tight feel hoti
              hai. Night-time support aur barrier repair zaroori ho jaata
              hai.
            </p>
          </div>
          <div className="p-6 sm:p-8 bg-warm-white rounded-xl border border-charcoal/[0.04]">
            <h4 className="font-sans text-sm font-medium text-charcoal mb-3">
              Wind = Environmental Stress
            </h4>
            <p className="text-stone text-sm leading-relaxed">
              Tez hawa skin ki outer layer ko disturb kar sakti hai.
              Barrier-supportive ingredients help karte hain skin ko
              protect karne mein.
            </p>
          </div>
          <div className="p-6 sm:p-8 bg-warm-white rounded-xl border border-charcoal/[0.04]">
            <h4 className="font-sans text-sm font-medium text-charcoal mb-3">
              Altitude = Stronger UV
            </h4>
            <p className="text-stone text-sm leading-relaxed">
              Higher altitude par UV exposure zyada hota hai. Daily SPF
              protection mountain environment mein essential hai — chahe
              din ho ya barsaat.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
