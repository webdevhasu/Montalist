import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { MountainStory } from './components/MountainStory'
import { EnvironmentalSection } from './components/EnvironmentalSection'
import { SystemSection } from './components/SystemSection'
import { ProductDetail } from './components/ProductDetail'
import { RoutineSection } from './components/RoutineSection'
import { LifestyleSection } from './components/LifestyleSection'
import { IngredientsSection } from './components/IngredientsSection'
import { TrustSection } from './components/TrustSection'
import { BundleSection } from './components/BundleSection'
import { PreOrderForm } from './components/PreOrderForm'
import { FAQSection } from './components/FAQSection'
import { FinalStatement } from './components/FinalStatement'
import { Footer } from './components/Footer'
import { products } from './data/products'

export default function App() {
  const heroProduct = products.find((p) => p.isHero && p.number === '02')!
  const nightCream = products.find((p) => p.id === 'barrier-night-cream')!
  const faceWash = products.find((p) => p.id === 'gentle-barrier-face-wash')!

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <main>
        <Hero />
        <MountainStory />
        <EnvironmentalSection />
        <SystemSection />
        <ProductDetail product={heroProduct} />
        <ProductDetail product={nightCream} reversed />
        <ProductDetail product={faceWash} />
        <RoutineSection />
        <LifestyleSection />
        <IngredientsSection />
        <TrustSection />
        <BundleSection />
        <PreOrderForm />
        <FAQSection />
        <FinalStatement />
      </main>
      <Footer />
    </div>
  )
}
