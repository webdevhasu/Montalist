import { useState, type FormEvent } from 'react'
import { useInView } from '@/hooks/useInView'

const skinConcerns = [
  'Dryness',
  'Sun protection',
  'Sensitivity',
  'Overall routine',
  'Mountain climate',
]

type FormState = 'idle' | 'loading' | 'success' | 'error'

interface FormData {
  name: string
  phone: string
  city: string
  email: string
  skinConcern: string
  consent: boolean
}

const initialData: FormData = {
  name: '',
  phone: '',
  city: '',
  email: '',
  skinConcern: '',
  consent: false,
}

export function PreOrderForm() {
  const { ref, isInView } = useInView(0.05)
  const [form, setForm] = useState<FormData>(initialData)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function validate(): boolean {
    const errs: Partial<Record<keyof FormData, string>> = {}
    if (!form.name.trim()) errs.name = 'Name zaroori hai.'
    if (!form.phone.trim()) errs.phone = 'Phone number zaroori hai.'
    else if (!/^[\d\s\-+()]{10,}$/.test(form.phone.trim())) errs.phone = 'Valid phone number darj karein.'
    if (!form.city.trim()) errs.city = 'City zaroori hai.'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Valid email darj karein.'
    if (!form.skinConcern) errs.skinConcern = 'Skin concern select karein.'
    if (!form.consent) errs.consent = 'Consent zaroori hai.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setFormState('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/preorders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setFormState('success')
      setForm(initialData)
    } catch (err) {
      setFormState('error')
      setErrorMsg(err instanceof Error ? err.message : 'Server error. Please try again.')
    }
  }

  function update(field: keyof FormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    if (formState === 'error') setFormState('idle')
  }

  if (formState === 'success') {
    return (
      <section id="preorder" ref={ref} className="py-20 sm:py-32 bg-ivory">
        <div className="max-w-lg mx-auto px-5 sm:px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-alpine/10 flex items-center justify-center mx-auto mb-6">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-alpine" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-charcoal mb-4">
            Shukriya
          </h3>
          <p className="text-stone leading-relaxed mb-6">
            Aapki reservation receive ho gayi hai. MONTALIST launch updates
            aapko share ki jayengi.
          </p>
          <div className="p-6 bg-warm-white rounded-xl border border-charcoal/[0.04] text-left space-y-2">
            <p className="text-stone text-sm">
              Yeh ek pre-launch reservation hai.
            </p>
            <p className="text-stone text-sm">
              Production validation aur testing ke baad confirm ki jayegi.
            </p>
            <p className="text-stone text-sm">
              Shipping date production confirmed hone ke baad communicate
              ki jayegi.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="preorder" ref={ref} className="py-20 sm:py-32 bg-ivory">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <div
          className={`transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-stone text-xs tracking-[0.3em] uppercase mb-4">
              Pre-Order
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal leading-[1.15] mb-4">
              System Reserve Karein
            </h2>
            <p className="text-stone max-w-lg mx-auto leading-relaxed text-sm">
              MONTALIST abhi launch se pehle early reservations collect kar
              raha hai. Pehle hum demand validate kareinge, phir production
              scale kareinge.
            </p>
          </div>

          <div className="p-6 sm:p-8 bg-warm-white rounded-2xl border border-charcoal/[0.04]">
            <div className="flex items-center justify-between p-4 bg-ivory rounded-xl mb-6">
              <div>
                <p className="text-charcoal text-sm font-medium">
                  The Mountain Skin System
                </p>
                <p className="text-stone text-xs">3 products — Face Wash + SPF 50+ + Night Cream</p>
              </div>
              <div className="text-right">
                <p className="text-charcoal text-lg font-serif font-medium">Rs 2,999</p>
                <p className="text-alpine text-xs">Free Delivery</p>
              </div>
            </div>

            <div className="mb-6 p-4 bg-ivory rounded-xl">
              <p className="text-charcoal text-sm font-medium mb-1">Launch Kit: The Mountain Skin System</p>
              <p className="text-stone text-xs leading-relaxed">
                Yeh ek pre-launch reservation hai. Pehle hum demand validate kareinge, phir production scale kareinge. Abhi koi payment nahi ho rahi.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs text-stone mb-1.5">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className="w-full px-4 py-3 bg-ivory rounded-lg border border-charcoal/[0.08] text-charcoal text-sm focus:outline-none focus:border-alpine transition-colors"
                  placeholder="Aapka pura naam"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs text-stone mb-1.5">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  className="w-full px-4 py-3 bg-ivory rounded-lg border border-charcoal/[0.08] text-charcoal text-sm focus:outline-none focus:border-alpine transition-colors"
                  placeholder="03XX XXXXXXX"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="city" className="block text-xs text-stone mb-1.5">
                  City *
                </label>
                <input
                  id="city"
                  type="text"
                  value={form.city}
                  onChange={(e) => update('city', e.target.value)}
                  className="w-full px-4 py-3 bg-ivory rounded-lg border border-charcoal/[0.08] text-charcoal text-sm focus:outline-none focus:border-alpine transition-colors"
                  placeholder="Aapka sheher"
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs text-stone mb-1.5">
                  Email (Optional)
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className="w-full px-4 py-3 bg-ivory rounded-lg border border-charcoal/[0.08] text-charcoal text-sm focus:outline-none focus:border-alpine transition-colors"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="skinConcern" className="block text-xs text-stone mb-1.5">
                  Skin Concern / Interest *
                </label>
                <select
                  id="skinConcern"
                  value={form.skinConcern}
                  onChange={(e) => update('skinConcern', e.target.value)}
                  className="w-full px-4 py-3 bg-ivory rounded-lg border border-charcoal/[0.08] text-charcoal text-sm focus:outline-none focus:border-alpine transition-colors appearance-none"
                >
                  <option value="">Select karein</option>
                  {skinConcerns.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.skinConcern && <p className="text-red-500 text-xs mt-1">{errors.skinConcern}</p>}
              </div>

              <div className="flex items-start gap-3 pt-1">
                <input
                  id="consent"
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => update('consent', e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-charcoal/20 text-alpine focus:ring-alpine"
                />
                <label htmlFor="consent" className="text-stone text-xs leading-relaxed">
                  Main samajhta hoon ke yeh ek pre-launch reservation hai. Koi
                  payment abhi nahi ho rahi. Final product testing aur
                  validation ke baad confirm kiya jayega. *
                </label>
              </div>
              {errors.consent && <p className="text-red-500 text-xs">{errors.consent}</p>}

              {formState === 'error' && (
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-red-600 text-xs">{errorMsg}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={formState === 'loading'}
                className="w-full py-3.5 bg-charcoal text-ivory rounded-full text-sm tracking-wide font-medium hover:bg-charcoal-light transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {formState === 'loading' ? 'Reserving...' : 'System Reserve Karein'}
              </button>
            </form>

            <div className="mt-6 p-4 bg-ivory rounded-lg space-y-1.5">
              <p className="text-stone text-xs leading-relaxed">
                Yeh ek pre-launch reservation hai — payment nahi ho rahi.
              </p>
              <p className="text-stone text-xs leading-relaxed">
                Production validation aur testing ke baad confirm ki jayegi.
              </p>
              <p className="text-stone text-xs leading-relaxed">
                Shipping date confirmed hone ke baad communicate ki jayegi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
