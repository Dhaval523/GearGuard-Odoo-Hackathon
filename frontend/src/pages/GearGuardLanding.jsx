// components/GearGuardLanding.jsx
import React from 'react'
import HeroSection from '../components/Sections/Hero'
import FeaturesSection from '../components/Sections/Features'
import WorkflowSection from '../components/Sections/WorkFlow'
import ModulesSection from '../components/Sections/ModulesSection'
import CTASection from '../components/Sections/CTASection'
import Footer from '../components/Sections/Footer'
import Header from '../components/Sections/Header'

const GearGuardLanding = () => {
  return (
    <div className="min-h-screen bg-[#FFFF] text-[#0B1C3F] overflow-x-hidden">
      <Header />

      <main className="relative z-10 space-y-24">
          <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
        {/* <ModulesSection /> */}
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}

export default GearGuardLanding
