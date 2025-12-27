// components/sections/FeaturesSection.jsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Database,
  Users,
  ClipboardCheck,
  Calendar,
  BarChart3,
  Bot,
  CheckCircle,
  Clock,
  TrendingUp,
  Zap,
  Shield,
  Bell,
  Settings,
  ChevronRight,
  X
} from 'lucide-react'

const features = [
  {
    icon: Database,
    title: 'Equipment Tracking',
    description: 'Centralized asset database with complete lifecycle tracking across departments and locations.',
    details: [
      'Real-time asset location tracking',
      'Complete maintenance history logs',
      'Warranty and service contract management',
      'Depreciation and lifecycle forecasting',
      'Barcode/QR code scanning support'
    ],
    stats: { value: '99.8%', label: 'Asset Accuracy' },
    color: 'from-blue-600 to-cyan-500',
    iconBg: 'bg-gradient-to-br from-blue-600 to-cyan-500'
  },
  {
    icon: Users,
    title: 'Maintenance Teams',
    description: 'Organize technicians into smart teams with role-based workflows and automated assignments.',
    details: [
      'Skill-based technician matching',
      'Team performance analytics',
      'Real-time task assignment',
      'Collaboration tools & messaging',
      'Certification & training tracking'
    ],
    stats: { value: '50%', label: 'Faster Response' },
    color: 'from-purple-600 to-pink-500',
    iconBg: 'bg-gradient-to-br from-purple-600 to-pink-500'
  },
  {
    icon: ClipboardCheck,
    title: 'Request Management',
    description: 'Manage corrective and preventive maintenance from request to resolution with automated workflows.',
    details: [
      'Mobile & web request submission',
      'Priority-based scheduling',
      'Automated approval workflows',
      'Parts & inventory integration',
      'Digital work order completion'
    ],
    stats: { value: '24/7', label: 'Availability' },
    color: 'from-green-600 to-emerald-500',
    iconBg: 'bg-gradient-to-br from-green-600 to-emerald-500'
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Visual calendar with automated preventive maintenance planning and resource optimization.',
    details: [
      'Drag & drop calendar interface',
      'Recurring maintenance schedules',
      'Resource capacity planning',
      'Conflict detection & resolution',
      'Mobile calendar sync'
    ],
    stats: { value: '95%', label: 'Schedule Adherence' },
    color: 'from-orange-600 to-amber-500',
    iconBg: 'bg-gradient-to-br from-orange-600 to-amber-500'
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description: 'Powerful insights with real-time charts, dashboards, and performance reports for data-driven decisions.',
    details: [
      'Real-time performance dashboards',
      'Custom report builder',
      'Predictive maintenance analytics',
      'Cost analysis & ROI tracking',
      'Compliance reporting'
    ],
    stats: { value: '100+', label: 'Report Templates' },
    color: 'from-indigo-600 to-blue-500',
    iconBg: 'bg-gradient-to-br from-indigo-600 to-blue-500'
  },
  {
    icon: Bot,
    title: 'Smart Automation',
    description: 'AI-powered workflows, auto-fill forms, and intelligent automation to reduce manual work.',
    details: [
      'AI-powered anomaly detection',
      'Automated task assignment',
      'Predictive failure alerts',
      'Smart form auto-completion',
      'Integration with IoT sensors'
    ],
    stats: { value: '80%', label: 'Tasks Automated' },
    color: 'from-amber-600 to-yellow-500',
    iconBg: 'bg-gradient-to-br from-amber-600 to-yellow-500'
  }
]

const FeaturesSection = () => {
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section
      id="features"
      className="relative py-2 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50/30 to-white"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:40px_40px]" />
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 -right-20 w-96 h-96 bg-gradient-to-br from-black/5 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 -left-20 w-96 h-96 bg-gradient-to-tr from-black/5 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="relative container mx-auto">
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-black/5 to-black/10 rounded-full border border-black/20 mb-8"
          >
            <Zap className="w-4 h-4" />
            <span className="text-sm font-semibold text-black/80">
              POWERFUL CAPABILITIES
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6"
          >
            Everything Your Team
            <span className="block">
              Needs to{' '}
              <span className="bg-gradient-to-r from-black via-neutral-700 to-black bg-clip-text text-transparent">
                Excel
              </span>
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-black/70 max-w-2xl mx-auto leading-relaxed"
          >
            Comprehensive features designed to streamline operations, boost efficiency,
            and deliver measurable results for modern maintenance teams.
          </motion.p>
        </motion.div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isHovered = hoveredIndex === index

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  y: -16,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedFeature(feature)}
                className="relative cursor-pointer group"
              >
                {/* Glow Effect */}
                <motion.div
                  animate={{
                    opacity: isHovered ? 0.2 : 0,
                    scale: isHovered ? 1.1 : 1
                  }}
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl blur-xl transition-opacity`}
                />

                {/* Card Container */}
                <div className="relative h-full bg-white/80 backdrop-blur-sm border border-black/10 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 border-2 rounded-2xl"
                    initial={false}
                    animate={{
                      borderColor: isHovered ? [
                        'rgba(0,0,0,0.1)',
                        'rgba(0,0,0,0.3)',
                        'rgba(0,0,0,0.1)'
                      ] : 'rgba(0,0,0,0.1)'
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      borderImage: isHovered ? `linear-gradient(90deg, ${feature.color}) 1` : 'none'
                    }}
                  />

                  {/* Icon Section */}
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.2 : 1,
                      rotate: isHovered ? 5 : 0
                    }}
                    className={`relative w-16 h-16 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-8 shadow-lg group-hover:shadow-xl transition-all`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                    
                    {/* Floating Badge */}
                    <motion.div
                      animate={{
                        scale: isHovered ? 1 : 0,
                        opacity: isHovered ? 1 : 0
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full border border-black/10 flex items-center justify-center"
                    >
                      <ChevronRight className="w-3 h-3 text-black" />
                    </motion.div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-black/90 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-black/70 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Quick Stats */}
                  <motion.div
                    animate={{
                      y: isHovered ? -10 : 0,
                      opacity: isHovered ? 1 : 0.8
                    }}
                    className="flex items-center justify-between mb-6"
                  >
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-black/80">
                        Performance
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-black">{feature.stats.value}</div>
                      <div className="text-xs text-black/60">{feature.stats.label}</div>
                    </div>
                  </motion.div>

                  {/* Feature Points */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: isHovered ? 'auto' : 0,
                      opacity: isHovered ? 1 : 0
                    }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-2 mb-6">
                      {feature.details.slice(0, 3).map((detail, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-sm text-black/70">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-black/10">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-medium text-black/60">
                        Available Now
                      </span>
                    </div>
                    <motion.div
                      animate={{
                        x: isHovered ? 5 : 0
                      }}
                      className="text-sm font-semibold text-black/80 flex items-center gap-1"
                    >
                      Learn More
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  </div>

                  {/* Hover Indicator */}
                  <motion.div
                    animate={{
                      width: isHovered ? '100%' : '0%'
                    }}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-black/20 to-transparent"
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* BOTTOM CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-black/5 to-black/10 rounded-full border border-black/20 mb-6">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-semibold text-black/80">
              READY TO TRANSFORM YOUR WORKFLOW?
            </span>
          </div>
          
          <p className="text-lg text-black/70 mb-8">
            Join thousands of maintenance teams who have optimized their operations with GearGuard
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-black to-neutral-800 text-white rounded-xl hover:shadow-2xl transition-all flex items-center gap-3 mx-auto group"
          >
            <span className="font-semibold">Explore All Features</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>

      {/* FEATURE DETAIL MODAL */}
      <AnimatePresence>
        {selectedFeature && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeature(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed inset-4 md:inset-12 lg:inset-20 xl:inset-40 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="h-full flex flex-col">
                {/* Modal Header */}
                <div className={`relative p-8 bg-gradient-to-br ${selectedFeature.color} text-white`}>
                  <button
                    onClick={() => setSelectedFeature(null)}
                    className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                      <selectedFeature.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold">{selectedFeature.title}</h3>
                      <p className="text-white/90 mt-2">{selectedFeature.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                      <div className="text-2xl font-bold">{selectedFeature.stats.value}</div>
                      <div className="text-sm opacity-90">{selectedFeature.stats.label}</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                      <div className="text-2xl font-bold">24/7</div>
                      <div className="text-sm opacity-90">Support</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                      <div className="text-2xl font-bold">99.9%</div>
                      <div className="text-sm opacity-90">Uptime</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                      <div className="text-2xl font-bold">API</div>
                      <div className="text-sm opacity-90">Integration</div>
                    </div>
                  </div>
                </div>
                
                {/* Modal Content */}
                <div className="flex-1 p-8 overflow-y-auto">
                  <h4 className="text-2xl font-bold text-black mb-6">Key Capabilities</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {selectedFeature.details.map((detail, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-black/80">{detail}</span>
                      </div>
                    ))}
                  </div>
                  
                  <h4 className="text-2xl font-bold text-black mb-6">Benefits</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl">
                      <TrendingUp className="w-8 h-8 text-black mb-4" />
                      <h5 className="font-bold text-black mb-2">Increased Efficiency</h5>
                      <p className="text-black/70 text-sm">Reduce manual work by up to 80% with automation</p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl">
                      <Shield className="w-8 h-8 text-black mb-4" />
                      <h5 className="font-bold text-black mb-2">Better Compliance</h5>
                      <p className="text-black/70 text-sm">Maintain complete audit trails and compliance records</p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl">
                      <Bell className="w-8 h-8 text-black mb-4" />
                      <h5 className="font-bold text-black mb-2">Proactive Alerts</h5>
                      <p className="text-black/70 text-sm">Get notified before issues become problems</p>
                    </div>
                  </div>
                </div>
                
                {/* Modal Footer */}
                <div className="p-8 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="text-center sm:text-left">
                      <p className="text-black/70 mb-2">Ready to implement this feature?</p>
                      <p className="text-sm text-black/60">Available in all subscription plans</p>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setSelectedFeature(null)}
                        className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        Close
                      </button>
                      <button className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors">
                        Start Free Trial
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

export default FeaturesSection