import { ingredients } from '@/data/content'
import { useInView } from '@/hooks/useInView'

export function IngredientsSection() {
  const { ref, isInView } = useInView(0.05)

  return (
    <section id="ingredients" ref={ref} className="py-20 sm:py-32 bg-ivory">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14 sm:mb-20">
          <p className="text-stone text-xs tracking-[0.3em] uppercase mb-4">
            Formula Philosophy
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal leading-[1.15] mb-5">
            Humari Formula Philosophy
          </h2>
          <p className="text-stone max-w-2xl mx-auto leading-relaxed">
            MONTALIST ka goal zyada ingredients dikhana nahi, balke har
            ingredient ka clear purpose rakhna hai.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {ingredients.map((ing, i) => (
            <div
              key={ing.name}
              className={`p-6 bg-warm-white rounded-xl border border-charcoal/[0.04] hover:border-charcoal/[0.08] transition-all duration-500 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-sans text-sm font-medium text-charcoal uppercase tracking-wider">
                  {ing.name}
                </h4>
                {ing.target && (
                  <span className="text-[10px] tracking-wider text-alpine font-medium bg-alpine/8 px-2 py-0.5 rounded">
                    {ing.target}
                  </span>
                )}
              </div>
              <p className="text-stone text-sm leading-relaxed">{ing.purpose}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-warm-white rounded-xl border border-charcoal/[0.04]">
          <p className="text-stone text-xs sm:text-sm leading-relaxed text-center">
            Listed percentages aur formulation details development targets hain.
            Final formula, testing aur product claims launch se pehle validate
            kiye jayenge.
          </p>
        </div>
      </div>
    </section>
  )
}
