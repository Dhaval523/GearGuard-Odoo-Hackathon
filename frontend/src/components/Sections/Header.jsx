import React from 'react'
import { motion } from 'framer-motion'
import { Wrench, ArrowRight } from 'lucide-react'
import '../../style/outlineNav.css'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E6E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center justify-between">

          {/* LOGO */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#6A5AE0] to-[#8B7CF6] shadow-md">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-[#0B1C3F]">
              GearGuard
            </span>
          </motion.div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6">

            {/* OUTLINE NAV */}
            <div className="nav-wrapper">
              <div className="nav-container">

                <a href="#features" className="nav-btn">Features</a>
                <a href="#workflow" className="nav-btn">Workflow</a>
                <a href="#modules" className="nav-btn">Modules</a>

                {/* SVG OUTLINE */}
                <svg
                  className="outline"
                  viewBox="0 0 360 48"
                  preserveAspectRatio="none"
                >
                  <rect
                    className="rect"
                    x="1"
                    y="1"
                    width="358"
                    height="46"
                    rx="24"
                  />
                </svg>

              </div>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                px-6 py-2.5 rounded-full
                bg-gradient-to-r from-[#6A5AE0] to-[#8B7CF6]
                text-white font-semibold
                shadow-lg hover:shadow-xl
                transition-all flex items-center gap-2
              "
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </motion.button>

          </div>

          {/* MOBILE MENU */}
          <button className="md:hidden p-2 rounded-lg hover:bg-[#F5F7FB]">
            <span className="block w-6 h-0.5 bg-[#0B1C3F] mb-1.5" />
            <span className="block w-6 h-0.5 bg-[#0B1C3F] mb-1.5" />
            <span className="block w-6 h-0.5 bg-[#0B1C3F]" />
          </button>

        </nav>
      </div>
    </header>
  )
}

export default Header
