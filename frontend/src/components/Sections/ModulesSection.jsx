// components/sections/ModulesSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  Users, 
  ClipboardCheck,
  Settings,
  Bell,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

const ModulesSection = () => {
  const modules = [
    {
      icon: <Database className="w-10 h-10" />,
      title: "Equipment Module",
      description: "Central database for tracking all company assets with detailed information",
      features: [
        "Department & Employee assignment",
        "Maintenance team responsibility",
        "Warranty & purchase tracking",
        "Location-based management"
      ],
      gradient: "from-blue-900/20 to-cyan-900/20",
      border: "border-blue-500/20"
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Team Module",
      description: "Manage specialized maintenance teams with smart workflow logic",
      features: [
        "Auto-assignment logic",
        "Smart notifications",
        "Team performance analytics",
        "Skill-based routing"
      ],
      gradient: "from-purple-900/20 to-pink-900/20",
      border: "border-purple-500/20"
    },
    {
      icon: <ClipboardCheck className="w-10 h-10" />,
      title: "Request Module",
      description: "Handle both corrective and preventive maintenance with full lifecycle tracking",
      features: [
        "Corrective & preventive types",
        "Calendar scheduling",
        "Priority management",
        "Real-time updates"
      ],
      gradient: "from-green-900/20 to-emerald-900/20",
      border: "border-green-500/20"
    }
  ];

  return (
    <section id="modules" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Core <span className="text-cyan-400">Modules</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive modules designed for maximum efficiency
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-gradient-to-br ${module.gradient} border ${module.border} rounded-2xl p-8 h-full`}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-white/10 to-white/5 rounded-xl mr-4">
                  {module.icon}
                </div>
                <h3 className="text-2xl font-bold">{module.title}</h3>
              </div>
              
              <p className="text-gray-300 mb-8">
                {module.description}
              </p>
              
              <ul className="space-y-4 mb-8">
                {module.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">99%</div>
                    <div className="text-sm text-gray-400">Efficiency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">50%</div>
                    <div className="text-sm text-gray-400">Time Saved</div>
                  </div>
                </div>
                <Settings className="w-5 h-5 text-gray-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;