'use client'

import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import GuestSection from '@/components/GuestSection'
import AsiEmpiezaTodo from '@/components/AsiEmpiezaTodo'
import ComboSection from '@/components/ComboSection'
import PackagesSection from '@/components/PackagesSection'
import TypesSection from '@/components/TypesSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import SplashScreen from '@/components/SplashScreen'
import useScrollReveal from '@/hooks/useScrollReveal'

export default function Home() {
  useScrollReveal()

  return (
    <>
      <SplashScreen />
      <Navbar />
      <main>
        <Hero />
        <GuestSection imageSrc="/user icon.jpg" />
        <AsiEmpiezaTodo />
        <ComboSection />
        <PackagesSection 
          logoSrc="/logo.svg"
          experienceSrc="/paquete-experience.png"
          intelligenceSrc="/paquete-intelligence.png"
          studioSrc="/paquete-studio.png"
          connectSrc="/paquete-connect.png"
        />
        <TypesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}