// components/sections/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                <Wrench className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold">GearGuard</span>
            </div>
            <p className="text-gray-400">
              The ultimate maintenance tracking solution for modern businesses.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-400 hover:text-cyan-400 transition">Features</a></li>
              <li><a href="#workflow" className="text-gray-400 hover:text-cyan-400 transition">Workflow</a></li>
              <li><a href="#modules" className="text-gray-400 hover:text-cyan-400 transition">Modules</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition">Pricing</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5" />
                <span>support@gearguard.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-6">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-500">
            © {new Date().getFullYear()} GearGuard. All rights reserved. The Ultimate Maintenance Tracker System.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;