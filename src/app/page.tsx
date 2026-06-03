import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import GuestSection from '@/components/GuestSection'
import AsiEmpiezaTodo from '@/components/AsiEmpiezaTodo'
import ComboSection from '@/components/ComboSection'
import PackagesSection from '@/components/PackagesSection'
import TypesSection from '@/components/TypesSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <GuestSection />
        <AsiEmpiezaTodo />
        <ComboSection />
        <PackagesSection />
        <TypesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
