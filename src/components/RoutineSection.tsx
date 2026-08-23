import { useInView } from '@/hooks/useInView'

const routineSteps = [
  {
    time: 'Morning',
    label: 'AM',
    steps: [
      { number: '01', name: 'Cleanse', product: 'Gentle Barrier Face Wash', image: '/images/products/facewash.png' },
      { number: '02', name: 'Protect', product: 'High-Altitude SPF 50+', image: '/images/products/sunblock.png' },
    ],
  },
  {
    time: 'Night',
    label: 'PM',
    steps: [
      { number: '01', name: 'Cleanse', product: 'Gentle Barrier Face Wash', image: '/images/products/facewash.png' },
      { number: '03', name: 'Support', product: 'Barrier Night Cream', image: '/images/products/nighcream.png' },
    ],
  },
]

interface RoutineBlockProps {
  block: { time: string; label: string; steps: { number: string; name: string; product: string; image: string }[] }
  index: number
  isInView: boolean
}

function RoutineBlock({ block, index, isInView }: RoutineBlockProps) {
  return (
    <div
      className={`bg-warm-white rounded-2xl p-8 sm:p-10 border border-charcoal/[0.04] transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs tracking-[0.2em] uppercase text-alpine font-medium bg-alpine/10 px-3 py-1.5 rounded-full">
          {block.label}
        </span>
        <span className="text-stone text-sm">{block.time}</span>
      </div>

      <div className="space-y-6">
        {block.steps.map((step) => (
          <div key={`${block.label}-${step.number}-${step.name}`} className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center shrink-0 p-2">
              <img src={step.image} alt={step.product} className="w-full h-full object-contain" loading="lazy" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-stone text-xs font-medium">{step.number}</span>
                <span className="text-stone/40">—</span>
                <span className="text-charcoal text-sm font-medium">{step.name}</span>
              </div>
              <p className="text-stone text-xs">{step.product}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function RoutineSection() {
  const { ref, isInView } = useInView(0.05)

  return (
    <section ref={ref} className="py-20 sm:py-32 bg-ivory">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14 sm:mb-20">
          <p className="text-stone text-xs tracking-[0.3em] uppercase mb-4">
            Your Routine
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal leading-[1.15] mb-5">
            Simple. Effective. Daily.
          </h2>
          <p className="text-stone max-w-xl mx-auto leading-relaxed">
            Sirf teen steps — morning aur night. Koi complicated routine nahi.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          {routineSteps.map((block, i) => (
            <RoutineBlock key={block.label} block={block} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
