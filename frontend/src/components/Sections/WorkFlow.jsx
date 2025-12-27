// components/sections/WorkflowSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  PlusCircle, 
  Zap, 
  UserCog, 
  Wrench, 
  CheckCircle,
  ArrowRight,
  Clock,
  TrendingUp,
  Shield,
  FileText,
  BarChart3,
  Sparkles,
  ChevronRight,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';

const WorkflowSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const workflowData = [
    {
      id: 1,
      icon: PlusCircle,
      title: "Create Request",
      description: "Intuitive request submission with AI-powered form auto-fill and priority detection",
      color: "from-blue-500 to-cyan-400",
      time: "30 seconds",
      efficiency: "90% faster",
      features: ["Mobile & Web Forms", "Photo Upload", "Auto-categorization", "Priority Detection"],
      stats: { value: "15s", label: "Avg. Submission" },
      details: {
        channels: ["Mobile App", "Web Portal", "Email", "SMS", "IoT Sensors"],
        automation: "AI analyzes requests and auto-fills 80% of fields",
        success: "99.8% submission success rate"
      }
    },
    {
      id: 2,
      icon: Zap,
      title: "Smart Routing",
      description: "AI-powered assignment to optimal team based on skills, location, and availability",
      color: "from-purple-500 to-pink-400",
      time: "Instant",
      efficiency: "95% accuracy",
      features: ["Skill Matching", "Location Optimization", "Workload Balance", "Urgency Detection"],
      stats: { value: "0s", label: "Auto-assignment" },
      details: {
        algorithms: ["Skill-based", "Location-based", "Load-balanced", "Priority-aware"],
        accuracy: "95% optimal assignment accuracy",
        reduction: "60% manual assignment work"
      }
    },
    {
      id: 3,
      icon: UserCog,
      title: "Team Dispatch",
      description: "Real-time technician dispatch with mobile notifications and smart scheduling",
      color: "from-green-500 to-emerald-400",
      time: "2 minutes",
      efficiency: "80% faster",
      features: ["Push Notifications", "Route Optimization", "Tool Checklist", "Safety Protocols"],
      stats: { value: "3min", label: "Avg. Response" },
      details: {
        tools: ["Mobile Dispatch", "Route Planning", "Tool Inventory", "Safety Checklist"],
        communication: "Real-time chat with requestor and team",
        tracking: "Live location and ETA updates"
      }
    },
    {
      id: 4,
      icon: Wrench,
      title: "Work Execution",
      description: "Digital work orders with real-time progress tracking and documentation",
      color: "from-orange-500 to-amber-400",
      time: "Real-time",
      efficiency: "100% tracked",
      features: ["Digital Work Orders", "Progress Photos", "Time Tracking", "Parts Usage"],
      stats: { value: "99%", label: "Live Tracking" },
      details: {
        tracking: ["GPS Location", "Time Logs", "Photo Updates", "Parts Used"],
        documentation: "Automated work documentation",
        compliance: "Regulatory compliance tracking"
      }
    },
    {
      id: 5,
      icon: CheckCircle,
      title: "Completion & Insights",
      description: "Automated reporting, feedback collection, and performance analytics",
      color: "from-indigo-500 to-blue-400",
      time: "1 minute",
      efficiency: "Auto-reporting",
      features: ["Digital Sign-off", "Feedback System", "Analytics Dashboard", "Report Generation"],
      stats: { value: "100%", label: "Documentation" },
      details: {
        reports: ["Performance Analytics", "Cost Analysis", "Compliance Reports", "ROI Tracking"],
        feedback: "Automated customer satisfaction surveys",
        insights: "Predictive maintenance recommendations"
      }
    }
  ];

  // Auto-play animation
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % workflowData.length;
        setProgress((next / (workflowData.length - 1)) * 100);
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, workflowData.length]);

  const handleStepClick = (index) => {
    setActiveStep(index);
    setProgress((index / (workflowData.length - 1)) * 100);
  };

  const currentStep = workflowData[activeStep];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-2 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-black/5 rounded-full"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
            }}
            animate={{
              x: [null, Math.random() * 100 + 'vw'],
              y: [null, Math.random() * 100 + 'vh'],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
        
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [100, 0, 100],
            y: [50, 0, 50],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative container mx-auto">
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-5xl mx-auto mb-24"
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-black/5 via-black/10 to-black/5 rounded-full border border-black/20 backdrop-blur-sm mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="w-5 h-5 text-black/80" />
            </motion.div>
            <span className="text-sm font-semibold text-black/80 tracking-wide">
              OPTIMIZED WORKFLOW PROCESS
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-black mb-8"
          >
            <span className="block">Streamlined</span>
            <span className="bg-gradient-to-r from-black via-neutral-800 to-black bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Workflow
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-black/70 max-w-3xl mx-auto leading-relaxed"
          >
            A perfectly orchestrated process that transforms maintenance requests into
            completed work with unmatched efficiency and precision.
          </motion.p>
        </motion.div>

        {/* MAIN WORKFLOW VISUALIZATION */}
        <div className="relative">
          {/* Progress Bar */}
          <div className="relative h-2 bg-black/10 rounded-full mb-20 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 50 }}
            />
            
            {/* Step Indicators */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between -translate-y-1/2">
              {workflowData.map((step, index) => (
                <motion.button
                  key={step.id}
                  onClick={() => handleStepClick(index)}
                  className="relative group"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className={`w-6 h-6 rounded-full border-4 border-white shadow-xl ${
                    activeStep >= index 
                      ? `bg-gradient-to-r ${step.color}`
                      : 'bg-gray-300'
                  }`}>
                    {activeStep === index && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                        style={{
                          background: `linear-gradient(135deg, ${step.color})`
                        }}
                      />
                    )}
                  </div>
                  
                  {/* Step Label */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                  >
                    <div className="text-xs font-semibold text-black/80 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full border border-black/10 shadow-sm">
                      Step {step.id}
                    </div>
                  </motion.div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* CENTERED CONTENT */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* LEFT: Current Step Details */}
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Floating Card */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl border border-black/10 shadow-2xl p-10 overflow-hidden">
                {/* Animated Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${currentStep.color} opacity-5`}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Step Header */}
                <div className="relative flex items-center gap-6 mb-8">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 10, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity
                    }}
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${currentStep.color} flex items-center justify-center shadow-xl`}
                  >
                    <currentStep.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-5xl font-bold text-black/90">
                        {currentStep.id}
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-black">{currentStep.title}</h2>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1 text-sm text-black/60">
                            <Clock className="w-4 h-4" />
                            {currentStep.time}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-black/60">
                            <TrendingUp className="w-4 h-4" />
                            {currentStep.efficiency}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-lg text-black/80 mb-8 leading-relaxed">
                  {currentStep.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {currentStep.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 p-3 bg-black/5 rounded-xl"
                    >
                      <Sparkles className="w-4 h-4 text-black/60" />
                      <span className="text-sm font-medium text-black/80">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-black/5 to-black/10 rounded-2xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">{currentStep.stats.value}</div>
                    <div className="text-sm text-black/60">{currentStep.stats.label}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">{currentStep.id}/5</div>
                    <div className="text-sm text-black/60">Current Step</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">100%</div>
                    <div className="text-sm text-black/60">Success Rate</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Step Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              {/* Device Frame */}
              <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 shadow-2xl">
                {/* Device Top */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-white/60 text-sm font-medium">
                    Step {currentStep.id} • {currentStep.title}
                  </div>
                  <Clock className="w-5 h-5 text-white/60" />
                </div>

                {/* App Content */}
                <div className="bg-gray-800 rounded-2xl p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${currentStep.color} flex items-center justify-center`}>
                        <currentStep.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-bold">{currentStep.title}</div>
                        <div className="text-white/60 text-sm">In Progress</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-sm text-green-400">Live</span>
                    </div>
                  </div>

                  {/* Progress Circle */}
                  <div className="relative w-40 h-40 mx-auto mb-6">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#374151"
                        strokeWidth="8"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={`url(#gradient-${currentStep.id})`}
                        strokeWidth="8"
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: 283 }}
                        animate={{ strokeDashoffset: 283 * (1 - (activeStep + 1) / 5) }}
                        strokeDasharray="283"
                        transform="rotate(-90 50 50)"
                      />
                      <defs>
                        <linearGradient id={`gradient-${currentStep.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor={currentStep.color.split(' ')[1]} />
                          <stop offset="100%" stopColor={currentStep.color.split(' ')[3]} />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-3xl font-bold text-white">
                        {Math.round((activeStep + 1) / 5 * 100)}%
                      </div>
                      <div className="text-sm text-white/60">Complete</div>
                    </div>
                  </div>

                  {/* Status Items */}
                  <div className="space-y-3">
                    {currentStep.details && Object.entries(currentStep.details).slice(0, 3).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-xl"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-black/20 to-black/10 flex items-center justify-center">
                          <BarChart3 className="w-4 h-4 text-white/60" />
                        </div>
                        <div className="flex-1">
                          <div className="text-white text-sm font-medium capitalize">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </div>
                          <div className="text-white/60 text-xs">
                            {Array.isArray(value) ? value.slice(0, 2).join(', ') : value}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-6 py-3 bg-gradient-to-r from-black to-gray-800 text-white rounded-xl flex items-center gap-2 shadow-lg"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  <span>{isPlaying ? 'Pause' : 'Play'} Animation</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleStepClick((activeStep + 1) % workflowData.length)}
                  className="px-6 py-3 border-2 border-black/20 rounded-xl flex items-center gap-2"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* STEP CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {workflowData.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  onClick={() => handleStepClick(index)}
                  className="relative cursor-pointer group"
                >
                  {/* Card */}
                  <div className={`relative bg-white/90 backdrop-blur-sm rounded-2xl border-2 p-6 shadow-lg transition-all duration-300 ${
                    isActive 
                      ? `border-opacity-100 shadow-xl scale-105`
                      : 'border-black/10 hover:border-black/30'
                  }`}>
                    {/* Step Number */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold shadow-lg">
                      {step.id}
                    </div>

                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-all ${
                      isActive 
                        ? `bg-gradient-to-r ${step.color} text-white`
                        : 'bg-black/5 text-black/60'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-black mb-2">{step.title}</h3>
                    <p className="text-sm text-black/60 mb-3">{step.description.substring(0, 80)}...</p>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-black/60">
                        <Clock className="w-4 h-4" />
                        {step.time}
                      </div>
                      <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        isActive 
                          ? `bg-gradient-to-r ${step.color} text-white`
                          : 'bg-black/5 text-black/60'
                      }`}>
                        {step.efficiency}
                      </div>
                    </div>

                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 border-2 rounded-2xl"
                        animate={{
                          borderColor: [
                            'rgba(0,0,0,0.1)',
                            `rgba(${step.color === 'from-blue-500 to-cyan-400' ? '59,130,246' : '168,85,247'},0.3)`,
                            'rgba(0,0,0,0.1)'
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

       
      </div>

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

export default WorkflowSection;