// components/sections/HeroSection.jsx
import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, AnimatePresence, useInView } from 'framer-motion';
import workflow from '../../assets/animations/WorkflowGearAnimation.json';
import {
  ArrowRight,
  Play,
  Shield,
  BarChart3,
  Users,
  Database,
  Sparkles,
  CheckCircle,
  TrendingUp,
  Zap,
  Wrench,
  Settings,
  Cpu,
  Server
} from 'lucide-react';
import Lottie from 'lottie-react';

const HeroSection = () => {
  const [titleRevealed, setTitleRevealed] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0); // 0: loading, 1: title reveal, 2: content show
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const controls = useAnimation();

  // Marvel-style title animation sequence
  const titleLetters = "GEARGUARD".split("");
  const subtitleWords = ["THE", "ULTIMATE", "MAINTENANCE", "TRACKER"];

  useEffect(() => {
    if (isInView) {
      const sequence = async () => {
        // Phase 1: Initial loading with animated background
        await controls.start({
          scale: [0.95, 1],
          opacity: [0, 1],
          transition: { duration: 0.5 }
        });

        // Phase 2: Title letter-by-letter reveal (Marvel style)
        await new Promise(resolve => setTimeout(resolve, 500));

        for (let i = 0; i < titleLetters.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 100));
          // Each letter reveals with scale and glow
        }

        setTitleRevealed(true);
        setAnimationPhase(1);

        await new Promise(resolve => setTimeout(resolve, 1000));
        setAnimationPhase(2);
      };

      sequence();
    }
  }, [isInView, controls]);

  // Animation variants for Marvel-style reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.5,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: [0, 1, 0],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const stats = [
    { value: '99%', label: 'Uptime', icon: Shield, color: 'from-green-500 to-emerald-500' },
    { value: '50%', label: 'Faster', icon: BarChart3, color: 'from-blue-500 to-cyan-500' },
    { value: '24/7', label: 'Support', icon: Users, color: 'from-purple-500 to-pink-500' },
    { value: '∞', label: 'Scalable', icon: Database, color: 'from-amber-500 to-orange-500' },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Animated Loading Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: animationPhase === 0 ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
      >
        {/* Loading Animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <div className="w-24 h-24 border-4 border-transparent border-t-blue-500 border-r-cyan-500 rounded-full" />
            <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-b-purple-500 border-l-pink-500 rounded-full" />
          </motion.div>
        </div>
      </motion.div>

      {/* Main Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: animationPhase >= 1 ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white"
      >
        {/* Animated Grid Pattern */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ delay: 0.5 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm33 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM89 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Floating Tech Icons */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 opacity-10"
        >
          <Wrench className="w-32 h-32 text-black" />
        </motion.div>

        <motion.div
          animate={{
            y: [20, 0, 20],
            rotate: [360, 0, 360]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 opacity-10"
        >
          <Settings className="w-40 h-40 text-black" />
        </motion.div>

        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [50, 0, 50]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-3/4 left-3/4 opacity-10"
        >
          <Cpu className="w-28 h-28 text-black" />
        </motion.div>

        <motion.div
          animate={{
            x: [50, 0, 50],
            y: [0, 50, 0]
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/3 right-1/3 opacity-10"
        >
          <Server className="w-36 h-36 text-black" />
        </motion.div>
      </motion.div>

      <div className="relative container mx-auto">
        {/* MARVEL-STYLE TITLE REVEAL */}
        <div className="relative min-h-[60vh] flex flex-col items-center justify-center">
          {/* Main Title Container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={animationPhase >= 1 ? "visible" : "hidden"}
            className="text-center mb-12"
          >
            {/* Glow Effect Behind Title */}
            <motion.div
              variants={glowVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-[800px] h-[400px] bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 rounded-full blur-3xl" />
            </motion.div>

            {/* Title Letters */}
            <div className="relative flex justify-center gap-2 mb-6">
              {titleLetters.map((letter, index) => (
                <motion.div
                  key={index}
                  variants={letterVariants}
                  custom={index}
                  className="relative"
                >
                  <span className="text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-900 to-black">
                    {letter}
                  </span>

                  {/* Letter Glow Effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.1
                    }}
                    className="absolute inset-0 text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 blur-xl"
                  >
                    {letter}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: titleRevealed ? 1 : 0,
                y: titleRevealed ? 0 : 30
              }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {subtitleWords.map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-black/80"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Description Reveal */}
          <AnimatePresence>
            {animationPhase >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-3xl mx-auto"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl text-black/70 mb-10 leading-relaxed"
                >
                  Revolutionizing maintenance management with AI-powered tracking,
                  automated workflows, and real-time insights for modern businesses.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-10 py-5 bg-gradient-to-r from-black to-gray-900 text-white rounded-xl hover:shadow-2xl transition-all overflow-hidden"
                  >
                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.8 }}
                    />

                    <div className="relative flex items-center gap-3 text-lg font-semibold">
                      <span>Start Free Trial</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-10 py-5 border-2 border-black/20 rounded-xl hover:border-black/40 transition-all flex items-center gap-3"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Play className="w-6 h-6 text-black/80" />
                    </motion.div>
                    <span className="text-lg font-semibold text-black/90">Watch Demo</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CONTENT REVEAL (Below Title) */}
        <AnimatePresence>
          {animationPhase >= 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid lg:grid-cols-2 gap-16 items-center mt-20"
            >
              {/* Left: Stats Grid */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-8"
                >
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-black/5 to-black/10 rounded-full border border-black/20 mb-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4 text-black/80" />
                    </motion.div>
                    <span className="text-sm font-semibold text-black/80">
                      TRUSTED BY INDUSTRY LEADERS
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                    Why <span className="text-black/90">GearGuard</span> is Different
                  </h2>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6">
                  {stats.map(({ value, label, icon: Icon, color }, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ y: -10, scale: 1.05 }}
                      className="relative group"
                    >
                      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-black/10 p-6 shadow-lg hover:shadow-xl transition-all">
                        {/* Animated Background */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${color} opacity-5 rounded-2xl`}
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.05, 0.1, 0.05]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity
                          }}
                        />

                        <div className="relative">
                          <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${color} mb-4`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>

                          <div className="text-4xl font-bold text-black mb-2">{value}</div>
                          <div className="text-sm font-medium text-black/70">{label}</div>
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 border-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity border-black/10" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Feature List */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="mt-12"
                >
                  <div className="space-y-4">
                    {[
                      "AI-powered predictive maintenance",
                      "Real-time equipment monitoring",
                      "Automated workflow routing",
                      "Mobile-first technician interface",
                      "Comprehensive analytics dashboard"
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-black/80">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right: Animation/Dashboard */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="relative"
              >
                <div className="relative w-full max-w-lg">
                  <Lottie
                    animationData={workflow}
                    loop
                    className="w-full h-full"
                  />
                </div>


                {/* Floating Elements */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-r from-black to-gray-900 rounded-lg flex items-center justify-center shadow-lg"
                >
                  <Zap className="w-5 h-5 text-white" />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {animationPhase >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-black/20 rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-black/40 rounded-full mt-2"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
        
        /* Marvel-style text glow */
        @keyframes marvel-glow {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))
                   drop-shadow(0 0 20px rgba(6, 182, 212, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.7))
                   drop-shadow(0 0 40px rgba(6, 182, 212, 0.5));
          }
        }
        
        .marvel-glow {
          animation: marvel-glow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;