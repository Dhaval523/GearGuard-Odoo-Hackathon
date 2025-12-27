// components/sections/CTASection.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Shield, 
  CheckCircle, 
  Sparkles,
  Zap,
  TrendingUp,
  Users,
  Clock,
  Star,
  Award,
  Globe,
  Rocket,
  ChevronRight,
  X
} from 'lucide-react';

const CTASection = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const testimonials = [
    { text: "Reduced our downtime by 60%", company: "Manufacturing Co." },
    { text: "Saved 20 hours per week on admin", company: "Facility Management" },
    { text: "99.8% maintenance request accuracy", company: "Healthcare Group" },
  ];

  const stats = [
    { value: "10K+", label: "Maintenance Teams", icon: Users },
    { value: "99.9%", label: "Uptime", icon: Shield },
    { value: "60%", label: "Time Saved", icon: Clock },
    { value: "4.9/5", label: "User Rating", icon: Star },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomStat = Math.floor(Math.random() * stats.length);
      // Just for visual effect, we'll rotate through stats
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormVisible(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white">
        {/* Floating Elements */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
              scale: 0
            }}
            animate={{
              x: [null, Math.random() * 100 + 'vw'],
              y: [null, Math.random() * 100 + 'vh'],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Large Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [100, 0, 100],
            y: [50, 0, 50],
            scale: [1, 1.4, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -right-40 w-[900px] h-[900px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative container mx-auto">
        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white/90 backdrop-blur-sm rounded-4xl border-2 border-black/10 shadow-2xl overflow-hidden"
        >
          {/* Animated Border */}
          <motion.div
            className="absolute inset-0 border-4 rounded-4xl"
            animate={{
              borderColor: [
                'rgba(0,0,0,0.1)',
                'rgba(59,130,246,0.3)',
                'rgba(0,0,0,0.1)',
                'rgba(6,182,212,0.3)',
                'rgba(0,0,0,0.1)'
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Top Pattern */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500" />

          <div className="relative p-12 md:p-16 lg:p-20">
            {/* Header Section */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-black/5 via-black/10 to-black/5 rounded-full border border-black/20 backdrop-blur-sm mb-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Rocket className="w-5 h-5 text-black/80" />
                </motion.div>
                <span className="text-sm font-semibold text-black/80 tracking-wide">
                  READY TO TRANSFORM YOUR OPERATIONS?
                </span>
              </motion.div>

              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-8"
              >
                Join the
                <span className="block bg-gradient-to-r from-black via-neutral-800 to-black bg-clip-text text-transparent">
                  Maintenance Revolution
                </span>
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl text-black/70 max-w-3xl mx-auto leading-relaxed"
              >
                Thousands of maintenance teams have transformed their operations with GearGuard.
                It's your turn to experience the future of maintenance management.
              </motion.p>
            </div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className="relative group"
                  >
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-black/10 p-6 text-center shadow-lg">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 mb-4"
                      >
                        <Icon className="w-7 h-7 text-black/80" />
                      </motion.div>
                      <div className="text-3xl font-bold text-black mb-2">{stat.value}</div>
                      <div className="text-sm text-black/60">{stat.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col lg:flex-row gap-8 items-center justify-center mb-16"
            >
              {/* Primary CTA */}
              <motion.button
                onMouseEnter={() => setHoveredButton('primary')}
                onMouseLeave={() => setHoveredButton(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFormVisible(true)}
                className="group relative px-12 py-6 bg-gradient-to-r from-black to-gray-900 text-white rounded-2xl hover:shadow-2xl transition-all overflow-hidden w-full lg:w-auto min-w-[280px]"
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: hoveredButton === 'primary' ? ['-100%', '100%'] : '-100%'
                  }}
                  transition={{
                    duration: 1,
                    ease: "linear"
                  }}
                />
                
                <div className="relative flex items-center justify-center gap-4 text-lg font-semibold">
                  <span>Start Free Trial</span>
                  <motion.div
                    animate={{ x: hoveredButton === 'primary' ? 10 : 0 }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </div>

                {/* Floating Badge */}
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                  className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full shadow-lg"
                >
                  FREE
                </motion.div>
              </motion.button>

              {/* Secondary CTA */}
              <div className="relative">
                <motion.button
                  onMouseEnter={() => setHoveredButton('secondary')}
                  onMouseLeave={() => setHoveredButton(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-12 py-6 border-2 border-black/20 rounded-2xl hover:border-black/40 transition-all flex items-center justify-center gap-4 w-full lg:w-auto min-w-[280px]"
                >
                  <motion.div
                    animate={{ scale: hoveredButton === 'secondary' ? 1.2 : 1 }}
                  >
                    <Play className="w-6 h-6 text-black/80" />
                  </motion.div>
                  <span className="text-lg font-semibold text-black/90">Watch Demo</span>
                </motion.button>

                {/* Play Button Glow */}
                {hoveredButton === 'secondary' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl"
                  />
                )}
              </div>
            </motion.div>

            {/* Testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-black/10 p-6 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-black/80 mb-4 font-medium">"{testimonial.text}"</p>
                  <div className="text-sm text-black/60">{testimonial.company}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-8 pt-12 border-t border-black/10"
            >
              {[
                { icon: Shield, label: "Enterprise Security" },
                { icon: Globe, label: "Global Infrastructure" },
                { icon: Award, label: "Industry Leader" },
                { icon: Zap, label: "Lightning Fast" },
              ].map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-3 px-4 py-2 bg-black/5 rounded-full"
                  >
                    <Icon className="w-5 h-5 text-black/60" />
                    <span className="text-sm font-medium text-black/70">{badge.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Bottom Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 text-center"
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-black/60">
                {[
                  { text: "No credit card required", icon: CheckCircle },
                  { text: "14-day free trial", icon: Clock },
                  { text: "Cancel anytime", icon: X },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2"
                    >
                      <Icon className="w-5 h-5 text-green-600" />
                      <span className="font-medium">{item.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Email Form Modal */}
      <AnimatePresence>
        {formVisible && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFormVisible(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl border border-black/20 shadow-2xl max-w-md w-full overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-black">Start Your Free Trial</h3>
                      <p className="text-black/60 mt-1">No credit card required</p>
                    </div>
                    <button
                      onClick={() => setFormVisible(false)}
                      className="p-2 hover:bg-black/5 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6 text-black/60" />
                    </button>
                  </div>

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                        transition={{ duration: 1 }}
                        className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircle className="w-10 h-10 text-white" />
                      </motion.div>
                      <h4 className="text-2xl font-bold text-black mb-2">Welcome Aboard!</h4>
                      <p className="text-black/70">Check your email to activate your free trial.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-black/80 mb-2">
                          Work Email
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full px-4 py-3 bg-black/5 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-black to-gray-900 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-3"
                      >
                        <span>Start Free Trial</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>

                      <p className="text-center text-sm text-black/60">
                        By continuing, you agree to our Terms and Privacy Policy
                      </p>
                    </form>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Floating CTA */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setFormVisible(true)}
          className="px-6 py-4 bg-gradient-to-r from-black to-gray-900 text-white rounded-full shadow-2xl flex items-center gap-3 backdrop-blur-sm border border-white/20"
        >
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold">Get Started Free</span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Gradient Animation CSS */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </section>
  );
};

export default CTASection;